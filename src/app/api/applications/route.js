import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request) {
  try {
    console.log('API Route Hit');
    const { searchParams } = new URL(request.url);
    const poster_email = searchParams.get('poster_email');
    console.log('Poster Email:', poster_email);

    if (!poster_email) {
      return NextResponse.json({ error: 'Poster email is required' }, { status: 400 });
    }

    // Fetch jobs associated with the poster email
    const { data: jobs, error: jobError } = await supabase
      .from('jobs')
      .select('job_id') // Correct column name
      .eq('poster_email', poster_email);

    if (jobError) {
      throw jobError;
    }

    console.log('Jobs fetched:', jobs);

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ applications: [] }, { status: 200 });
    }

    const jobIds = jobs.map((job) => job.job_id);

    // Fetch applications for the job IDs
    const { data: applications, error: appError } = await supabase
      .from('applications')
      .select('*')
      .in('job_id', jobIds);

    if (appError) {
      throw appError;
    }

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error('Database query failed', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const { job_id, applicant_email, application_details } = await request.json();

    if (!job_id || !applicant_email) {
      return NextResponse.json({ error: 'Job ID and applicant email are required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('applications')
      .insert([{ job_id, applicant_email, application_details }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database insertion failed', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
