import { NextResponse } from 'next/server';
import { Client } from 'pg';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Jobs')
      .select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Database query failed', error);

    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, company, location, pay, description } = data;

    const { error } = await supabase
      .from('Jobs')
      .insert([{ title, company, location, pay, description }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Job posted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database insertion failed', error);

    return NextResponse.json({ error: 'Failed to post job' }, { status: 500 });
  }
}
