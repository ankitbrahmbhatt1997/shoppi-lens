import type { NextApiRequest, NextApiResponse } from 'next';
import conn from '@/config/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await conn.connect();
    const result = await client.query('SELECT NOW()');
    client.release();

    res.status(200).json({ 
      success: true, 
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to connect to database' 
    });
  }
}
