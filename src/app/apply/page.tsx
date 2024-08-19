"use client"

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface Job {
  job_id: number;
  title: string;
  company: string;
  location: string;
  pay: string;
  description: string;
  poster_email: string;
}

const ApplyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicationDetails, setApplicationDetails] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);

  const jobId = searchParams.get('job_id');

  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        try {
          const response = await fetch(`/api/jobs`);
          const jobData: Job[] = await response.json();
          
          if (response.ok && jobData.length > 0) {
            console.log(jobData)
            console.log(jobId)
            const job = jobData.find((job) => job.job_id === Number(jobId));
            if (job) {
              setJob(job);
            } else {
              setMessage('Job not found');
              setMessageType('error');
            }
          } else {
            setMessage('No job data returned');
            setMessageType('error');
          }
        } catch (error) {
          console.error('Failed to fetch job details', error);
          setMessage('Failed to fetch job details');
          setMessageType('error');
        } finally {
          setLoading(false);
        }
      };

      fetchJobDetails();
    } else {
      setMessage('No job ID provided');
      setMessageType('error');
      setLoading(false);
    }
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_id: jobId, applicant_email: applicantEmail, application_details: applicationDetails }),
      });

      if (response.ok) {
        setMessage('Application submitted successfully!');
        setMessageType('success');
        setTimeout(() => router.push('/'), 2000);
      } else {
        setMessage('Failed to submit application');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Failed to submit application', error);
      setMessage('Error: Unable to submit application');
      setMessageType('error');
    }
  };

  return (
    <Suspense>
    <div>
      <Navbar />
      <div className="h-auto mt-32 md:mt-48 text-center mx-auto">
        <h1 className='text-2xl font-bold'>Apply for Job</h1>
        {message && (
          <div className={`p-4 mb-4 ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded`}>
            {message}
          </div>
        )}
        {loading ? (
          <p>Loading job details...</p>
        ) : job ? (
          <form onSubmit={handleSubmit} className="form-control md:w-1/3 mx-auto p-6">
            <h2 className='text-xl font-semibold mb-4'>{job.title}</h2>
            <p className='mb-4'>Company: {job.company}</p>
            <p className='mb-4'>Location: {job.location}</p>
            <p className='mb-4'>Pay: {job.pay}</p>
            <p className='mb-4'>Description: {job.description}</p>

            <input 
              type='email' 
              placeholder="Your Email" 
              className="input input-bordered mb-2"
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              required
            />
            
            <textarea 
              name="application_details"
              placeholder="Your Application Details" 
              className="textarea textarea-bordered min-h-56 text-base mb-2" 
              value={applicationDetails}
              onChange={(e) => setApplicationDetails(e.target.value)}
              required
            />
            
            <button type="submit" className='btn btn-primary'>Submit Application</button>
          </form>
        ) : (
          <p>No job details available</p>
        )}
      </div>
    </div>
    </Suspense>
  );
};

export default ApplyPage;
