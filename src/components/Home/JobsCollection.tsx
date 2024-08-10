import React, { useEffect, useState } from 'react'
import JobExpanded from './JobExpanded'

const JobsCollection = () => {

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

  const openJobInfo = ({key}: {key: string}) => {
    console.log(`opened job ${key}`)
    setSelectedJobId(key)
  }

  return (
    <div className='min-w-full bg-red-800 mx-auto md:px-72 flex gap-20'>
      <div className='md:w-1/3 bg-blue-400 cursor-pointer mb-20'>
        {Object.entries(jobs).map(([key, job]) => (
          <div key={key} onClick={() => {openJobInfo({key})}} className='my-10  bg-white p-4 border-2  border-gray-400 card h-56'>
            <h3 className='text-xl font-bold'>{job.name}</h3>
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
    </div>
  )
}

export default JobsCollection