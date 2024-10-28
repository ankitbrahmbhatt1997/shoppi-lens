import type { NextApiRequest, NextApiResponse } from 'next';
import { createTableIfNotExists } from '@/utils/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tableCreated = await createTableIfNotExists();
    res.status(200).json({ 
      success: true, 
      tableCreated,
      message: tableCreated ? 'Table created successfully' : 'Table already exists'
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
