import React, { useEffect, useState } from 'react'

const JobExpanded = () => {

  interface Job {
    name: string;
    company: string;
    location: string;
    pay: string;
    description: string;
  }

  interface Jobs {
    [key: string]: Job;
  }
  const [jobs, setJobs] = useState<Jobs>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/jobs.json');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [selectedJobId, setSelectedJobId] = useState('1'); // Set default selected job ID here

  const job = jobs[selectedJobId];

  return (
    <div>
      <div className='my-10 bg-white p-4 border-2 border-gray-400 card h-56'>
        {job ? (
          <>
            <h3 className='text-xl font-bold'>{job.name}</h3>
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
  )
}

export default JobExpanded