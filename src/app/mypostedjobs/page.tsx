"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Job {
  job_id: number;
  title: string;
  company: string;
  location: string;
  pay: string;
  description: string;
}

const MyPostedJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Job | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user?.email) {
          const response = await fetch(`/api/posted?poster_email=${encodeURIComponent(user.email)}`);
          const data = await response.json();

          if (response.ok && Array.isArray(data.jobs)) {
            setJobs(data.jobs);
          } else {
            setMessage('Failed to fetch jobs');
            setMessageType('error');
          }
        } else {
          setMessage('User email not found');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Failed to fetch jobs', error);
        setMessage('Error: Unable to fetch jobs');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    fetchPostedJobs();
  }, []);

  const handleDelete = async (job_id: number) => {
    try {
      const response = await fetch(`/api/posted?job_id=${job_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Job deleted successfully!');
        setMessageType('success');
        setJobs(jobs.filter(job => job.job_id !== job_id)); // Remove the deleted job from the list
      } else {
        setMessage('Failed to delete job');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Failed to delete job', error);
      setMessage('Error: Unable to delete job');
      setMessageType('error');
    }
  };

  const handleConfirmDelete = (job: Job) => {
    setConfirmDelete(job);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <div>
      <Navbar />
      <div className="h-auto mt-32 md:mt-48 text-center mx-auto px-4">
        <h1 className='text-2xl font-bold mb-4'>My Posted Jobs</h1>
        {message && (
          <div className={`p-4 mb-4 ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded`}>
            {message}
          </div>
        )}
        {loading ? (
          <p>Loading your jobs...</p>
        ) : jobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-separate border-spacing-2 border border-gray-200">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2">Title</th>
                  <th className="border-b px-4 py-2">Company</th>
                  <th className="border-b px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.job_id} className="hover:bg-gray-100">
                    <td className="border-b px-4 py-2">{job.title}</td>
                    <td className="border-b px-4 py-2">{job.company}</td>
                    <td className="border-b px-4 py-2">
                      <button
                        onClick={() => handleConfirmDelete(job)}
                        className="btn btn-danger mr-2"
                      >
                        Delete
                      </button>
                      {/* <button
                        onClick={() => router.push(`/edit-job/${job.job_id}`)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No jobs posted</p>
        )}

        {/* Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete the job: {confirmDelete.title}?</p>
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(confirmDelete.job_id)}
                  className="btn btn-danger mr-2"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostedJobsPage;
