import type { NextApiRequest, NextApiResponse } from 'next';
import { getImageFilePaths } from '@/utils';
import { insertInTable, createTableIfNotExists } from '@/utils/database';
import path from 'path';


// One time operation to input the dataset into the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // First, ensure the table exists
    console.log('Checking/creating table...');
    await createTableIfNotExists();
    
    // Then proceed with loading the dataset
    const datasetPath = path.join(process.cwd(), 'data-set');
    const imagePaths = getImageFilePaths(datasetPath);

    if (imagePaths.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'No images found in data-set folder' 
      });
    }

    console.log('Starting to process images...');
    await insertInTable(imagePaths);

    console.log('Processed paths:', imagePaths);
    
    res.status(200).json({ 
      success: true, 
      message: `Successfully processed ${imagePaths.length} images`,
      processedFiles: imagePaths
    });
  } catch (error) {
    console.error('Error loading dataset:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to load dataset',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
