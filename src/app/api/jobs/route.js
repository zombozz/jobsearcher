import { NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobQuery = searchParams.get('job') || '';
    const locationQuery = searchParams.get('location') || '';

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .ilike('title', `%${jobQuery}%`)
      .ilike('location', `%${locationQuery}%`);

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
    const { title, company, location, pay, description, poster_email } = data;

    const { error } = await supabase
      .from('jobs')
      .insert([{ title, company, location, pay, description, poster_email }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Job posted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database insertion failed', error);

    return NextResponse.json({ error: 'Failed to post job' }, { status: 500 });
  }
}
