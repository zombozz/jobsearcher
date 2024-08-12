import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  });

  try {
    await client.connect();
    const res = await client.query('SELECT * FROM Jobs');
    await client.end();
    
    // Ensure res.rows is defined and send the response
    return NextResponse.json(res.rows || []);
  } catch (error) {
    console.error('Database query failed', error);
    
    // Send error response
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
