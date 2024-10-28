import { getImageFilePaths } from '@/utils';
import { insertInTable } from '@/utils/database';
import path from 'path';

async function loadDataset() {
  try {
    // Get the absolute path to the data-set folder
    const datasetPath = path.join(process.cwd(), 'data-set');
    
    // Get all image paths from the data-set folder
    console.log('Scanning directory:', datasetPath);
    const imagePaths = getImageFilePaths(datasetPath);
    
    if (imagePaths.length === 0) {
      console.log('No images found in the data-set folder');
      return;
    }

    console.log(`Found ${imagePaths.length} images. Starting upload...`);

    // Process images in batches to avoid overwhelming the system
    const batchSize = 5;
    for (let i = 0; i < imagePaths.length; i += batchSize) {
      const batch = imagePaths.slice(i, i + batchSize);
      console.log(`Processing batch ${i / batchSize + 1}/${Math.ceil(imagePaths.length / batchSize)}`);
      
      try {
        await insertInTable(batch);
        console.log(`Successfully processed batch of ${batch.length} images`);
      } catch (error) {
        console.error(`Error processing batch starting at index ${i}:`, error);
      }

      // Optional: Add a small delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Dataset loading completed!');
  } catch (error) {
    console.error('Error loading dataset:', error);
  }
}

// Execute the script
loadDataset().catch(console.error);
