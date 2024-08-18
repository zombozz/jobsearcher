"use client";

import React, { useState, useEffect } from 'react';
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
  const [selectedJobId, setSelectedJobId] = useState<number | null>(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); 
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const job = data?.find((job) => job.job_id === selectedJobId);

  const openJobInfo = (job_id: number) => {
    setInitialLoad(false);
    setSelectedJobId(job_id);
    if (window.innerWidth < 768) {
      setIsMobileView(true);
    }
  };

  const closeJobInfo = () => {
    setSelectedJobId(null);
    setIsMobileView(false);
  };

  const handleApply = (job_id: number) => {
    console.log(`Applied for job id: ${job_id}`);
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='min-w-full mx-auto lg:px-20 2xl:px-72 flex gap-20'>
      {/* Mobile View */}
      {!initialLoad && isMobileView && job && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-80 z-50 p-4'>
          <div className='bg-white p-6 rounded-lg relative h-full'>
            <button 
              className='absolute top-4 right-4 text-2xl' 
              onClick={closeJobInfo}
            >
              &times;
            </button>
            <>
              <h3 className='text-xl font-bold'>{job.title}</h3>
              <p className='text-sm'>{job.company}</p>
              <p className='text-sm'>{job.location}</p>
              <p className='text-sm border border-w-2 bg-gray-300 mt-1 py-1 px-1 rounded-md w-max'>{job.pay}</p>
              <button 
                className='btn btn-primary inline-block my-3 text-white' 
                onClick={() => handleApply(job.job_id)}
              >
                Apply
              </button>
              <p className='text-sm overflow-hidden'>{job.description}</p>
            </>
          </div>
        </div>
      )}

      {/* Desktop View */}
      <div className='md:w-1/3'>
        {data.map((job) => (
          <div
            key={job.job_id}
            onClick={() => openJobInfo(job.job_id)}
            className={`my-10 bg-white p-4 border-2 border-gray-400 card h-56 cursor-pointer ${selectedJobId == job.job_id ? 'border-primary' : ''}`}
          >
            <h3 className='text-xl font-bold'>{job.title}</h3>
            <p className='text-sm'>{job.company}</p>
            <p className='text-sm'>{job.location}</p>
            <p className='text-sm border border-w-2 bg-gray-300 mb-3 mt-1 py-1 px-1 rounded-md w-max'>{job.pay}</p>
            <p className='text-sm overflow-hidden'>{job.description}</p>
          </div>
        ))}
      </div>

      <div className="w-2/3 h-screen overflow-y-auto hidden md:block sticky top-20">
        {job && (
          <div className='my-10 bg-white p-4 border-2 border-gray-400 card h-max'>
            <h3 className='text-xl font-bold'>{job.title}</h3>
            <p className='text-sm'>{job.company}</p>
            <p className='text-sm'>{job.location}</p>
            <p className='text-sm border border-w-2 bg-gray-300 mt-1 py-1 px-1 rounded-md w-max'>{job.pay}</p>
            <button onClick={() => handleApply(job.job_id)} 
              className='btn btn-primary inline-block my-3 text-white'>Apply</button>
            <p className='text-sm overflow-hidden'>{job.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsCollection;
