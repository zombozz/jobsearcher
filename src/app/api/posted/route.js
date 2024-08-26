import { supabase } from '@/lib/supabaseClient';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const posterEmail = searchParams.get('poster_email');

  if (!posterEmail) {
    return new Response(JSON.stringify({ error: 'Missing poster_email' }), {
      status: 400,
    });
  }

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('poster_email', posterEmail);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ jobs }), {
    status: 200,
  });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('job_id');

  if (!jobId) {
    return new Response(JSON.stringify({ error: 'Missing job_id' }), {
      status: 400,
    });
  }

  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('job_id', jobId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: 'Job deleted successfully' }), {
    status: 200,
  });
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('job_id');
  const updates = await req.json();

  if (!jobId) {
    return new Response(JSON.stringify({ error: 'Missing job_id' }), {
      status: 400,
    });
  }

  const { error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('job_id', jobId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: 'Job updated successfully' }), {
    status: 200,
  });
}
