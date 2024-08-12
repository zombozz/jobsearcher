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
    
    return NextResponse.json(res.rows || []);
  } catch (error) {
    console.error('Database query failed', error);
    
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request) {
  const client = new Client({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  });
  try {
    await client.connect();

    const data = await request.json();

    const { title, company, locations, pay, description } = data;

    const query = `
      INSERT INTO Jobs (title, company, locations, pay, description)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await client.query(query, [title, company, locations, pay, description]);

    await client.end();

    return NextResponse.json({ message: 'Job posted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database insertion failed', error);
    
    return NextResponse.json({ error: 'Failed to post job' }, { status: 500 });
  }
}
