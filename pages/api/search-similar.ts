import type { NextApiRequest, NextApiResponse } from 'next';
import { visionEmbeddingGenerator } from '@/utils/model';
import { searchSimilarImages } from '@/utils/database';
import formidable from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    
    const uploadedFile = files.image?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ 
        success: false, 
        error: 'No image file provided' 
      });
    }

    // Generate embedding for the uploaded image
    const imageEmbedding = await visionEmbeddingGenerator(uploadedFile.filepath);
    
    // Search for similar images
    const similarImages = await searchSimilarImages(Array.from(imageEmbedding), 10);

    // Clean up the temporary file
    await fs.unlink(uploadedFile.filepath);

    res.status(200).json({ 
      success: true,
      similarImages
    });
  } catch (error) {
    console.error('Error processing image search:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process image search',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
