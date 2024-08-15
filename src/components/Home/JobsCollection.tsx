"use client" 

import React, { useState } from 'react';
import useSWR from 'swr';

interface Job {
  job_id: number;
  title: string;
  company: string;
  location: string;
  pay: string;
  description: string;
}

const fetcher = async (url: string): Promise<Job[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const JobsCollection = () => {
  const { data, error } = useSWR<Job[]>('/api/jobs', fetcher);
  const [selectedJobId, setSelectedJobId] = useState(1);

  // Find the job that matches the selected job ID
  const job = data?.find((job) => job.job_id === selectedJobId);

  const openJobInfo = (job_id: number) => {
    setSelectedJobId(job_id);
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='min-w-full bg-red-800 mx-auto lg:px-20 2xl:px-72 flex gap-20'>
      <div className='md:w-1/3 bg-blue-400 cursor-pointer mb-20'>
        {data.map((job) => (
          <div
            key={job.job_id}
            onClick={() => openJobInfo(job.job_id)}
            className='my-10  bg-white p-4 border-2  border-gray-400 card h-56'>
            <h3 className='text-xl font-bold'>{job.title}</h3>
            <p className='text-sm'>{job.company}</p>
            <p className='text-sm'>{job.location}</p>
            <p className='text-sm border border-w-2 bg-gray-300 mb-3 mt-1 py-1 px-1 rounded-md w-max'>{job.pay}</p>
            <p className='text-sm overflow-hidden'>{job.description}</p>
          </div>
        ))}
      </div>

      <div className="w-2/3 h-screen overflow-y-auto hidden md:block sticky top-20">
        <div className='my-10 bg-white p-4 border-2 border-gray-400 card h-max'>
          {job ? (
            <>
              <h3 className='text-xl font-bold'>{job.title}</h3>
              <p className='text-sm'>{job.company}</p>
              <p className='text-sm'>{job.location}</p>
              <p className='text-sm border border-w-2 bg-gray-300 mb-3 mt-1 py-1 px-1 rounded-md w-max'>{job.pay}</p>
              <p className='text-sm overflow-hidden'>{job.description}</p>
            </>
          ) : (
            <p>No job found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsCollection;
