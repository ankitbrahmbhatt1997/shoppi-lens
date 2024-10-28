import supabase from '@/config/db';  // Regular client for queries
import supabaseAdmin from '@/config/admin-db';  // Admin client for uploads
import { visionEmbeddingGenerator } from '@/utils/model'; 
import fs from 'fs';
import path from 'path';

// Modified upload function to handle Blob correctly
async function uploadToStorage(filePath: string): Promise<string> {
  try {
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    const file = new File([fileBuffer], fileName, { type: 'image/jpeg' });

    // Use admin client for upload
    const { data, error } = await supabaseAdmin
      .storage
      .from('image-search')
      .upload(`images/${fileName}`, file, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('image-search')
      .getPublicUrl(`images/${fileName}`);

    return publicUrl;
  } catch (err) {
    console.error(`Error uploading file ${filePath}:`, err);
    throw err;
  }
}

export async function createTableIfNotExists() {
  try {
    // Check if table exists by attempting to query it
    const { error: queryError } = await supabase
      .from('search_table')
      .select('id')
      .limit(1);

    // If table doesn't exist, create it using RPC
    if (queryError && queryError.message.includes('does not exist')) {
      const { error: createError } = await supabase
        .rpc('initialize_search_table');

      if (createError) {
        throw createError;
      }
      console.log('Table created successfully');
      return true;
    }

    console.log('Table already exists');
    return false;
  } catch (err) {
    console.error('Error in database operation:', err);
    throw err;
  }
}

export async function insertInTable(filePaths: string[]) {
  try {
    for (const filePath of filePaths) {
      try {
        // First upload the file to Supabase Storage
        console.log(`Uploading ${filePath} to storage...`);
        const publicUrl = await uploadToStorage(filePath);
        console.log(`File uploaded successfully. Public URL: ${publicUrl}`);

        // Generate embeddings
        const vision_embedding = await visionEmbeddingGenerator(filePath);
        const embedding_array = Array.from(vision_embedding);
        
        // Insert using public URL instead of local path
        const { error } = await supabase
          .from('search_table')
          .insert({
            path: publicUrl,  // Store the public URL instead of local path
            embedding: embedding_array
          });

        if (error) {
          throw error;
        }

        console.log(`Successfully processed ${filePath}`);
      } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
        throw err;
      }
    }

    return true;
  } catch (err) {
    console.error('Error in insert operation:', err);
    throw err;
  }
}

export async function searchSimilarImages(embedding: number[], limit: number = 10) {
  try {
    // Using Supabase's rpc to handle vector similarity search with a lower threshold
    const { data, error } = await supabase.rpc('match_images', {
        query_embedding: embedding,
        match_threshold: 0.3,  // Lowered threshold to get more diverse results
        match_limit: limit
      });

    if (error) {
      throw error;
    }

    // If no results or very few results, try with an even lower threshold
    if (!data || data.length < 3) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .rpc('match_images', {
          query_embedding: embedding,
          match_threshold: 0.1,  // Very low threshold as fallback
          match_limit: limit
        });

      if (fallbackError) throw fallbackError;
      return fallbackData || [];
    }

    return data;
  } catch (err) {
    console.error('Error in similarity search:', err);
    throw err;
  }
}
