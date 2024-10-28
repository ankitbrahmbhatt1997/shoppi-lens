import type { NextApiRequest, NextApiResponse } from 'next';
import { insertInTable } from '@/utils/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filePaths } = req.body;

    if (!Array.isArray(filePaths)) {
      return res.status(400).json({ 
        success: false, 
        error: 'filePaths must be an array' 
      });
    }

    await insertInTable(filePaths);
    
    res.status(200).json({ 
      success: true, 
      message: 'Embeddings inserted successfully'
    });
  } catch (error) {
    console.error('Error inserting embeddings:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to insert embeddings',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
