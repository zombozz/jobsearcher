import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('myDatabase');
const collection = db.collection('contactForm');

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await client.connect();

    await collection.insertOne({ name, email, message, createdAt: new Date() });

    return NextResponse.json({ success: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving to database:', error);
    return NextResponse.json({ error: 'Failed to send message, please try again later.' }, { status: 500 });
  } finally {
    await client.close();
  }
}
