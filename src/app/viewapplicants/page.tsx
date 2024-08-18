"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabaseClient';
import useSWR from 'swr';

interface Application {
  id: number;
  job_id: number;
  applicant_email: string;
  application_details: string;
  job_title?: string;
  job_company?: string;
}

interface Job {
  job_id: number;
  title: string;
}

const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ViewApplicants = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);

  const { data: jobsData, error: jobsError } = useSWR('/api/jobs', fetcher);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          const response = await fetch(`/api/applications?poster_email=${encodeURIComponent(user.email)}`);
          const data = await response.json();
          console.log('API Response:', data);

          if (Array.isArray(data.applications)) {
            const applicationsWithJobDetails = data.applications.map((app: Application) => {
              const job = jobsData?.find((job: Job) => job.job_id === app.job_id);
              return {
                ...app,
                job_title: job?.title,
              };
            });

            setApplications(applicationsWithJobDetails);
          } else {
            console.warn('Unexpected data structure:', data);
            setMessage('Failed to fetch applications');
            setMessageType('error');
          }
        } else {
          setMessage('User email not found');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Failed to fetch applications', error);
        setMessage('Error: Unable to fetch applications');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobsData]);

  if (jobsError) return <div>Failed to load job details</div>;
  if (!jobsData) return <div>Loading job details...</div>;

  return (
    <div>
      <Navbar />
      <div className="h-auto mt-32 md:mt-48 text-center mx-auto">
        <h1 className='text-2xl font-bold'>View Applicants</h1>
        {message && (
          <div className={`p-4 mb-4 ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded`}>
            {message}
          </div>
        )}
        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-separate border-spacing-2 border border-gray-200">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2">Job Title</th>
                  <th className="border-b px-4 py-2">Applicant Email</th>
                  <th className="border-b px-4 py-2">Application Details</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-100">
                    <td className="border-b px-4 py-2">{app.job_title || 'Unknown'}</td>
                    <td className="border-b px-4 py-2">{app.applicant_email}</td>
                    <td className="border-b px-4 py-2">{app.application_details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No applications available</p>
        )}
      </div>
    </div>
  );
};

export default ViewApplicants;
