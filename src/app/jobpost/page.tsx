"use client"

import React, { useState } from 'react'
import { useLocalStorageUser } from '@/components/useLocalStorageUser';
import Navbar from '@/components/Navbar';

const page = () => {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [city, setCity] = useState("")
  const [suburb, setSuburb] = useState("")
  const [pay, setPay] = useState("")
  const [frequency, setFrequency] = useState("Per Hour")
  const [description, setDescription] = useState("")

  const user = useLocalStorageUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formattedPay = `$${pay} ${frequency}`
    const location = `${city}, ${suburb}`

    const jobData = {
      title,
      company,
      location,
      pay: formattedPay,
      description
    }

    // Submit jobData to PostgreSQL database
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        // Handle successful submission
        console.log('Job posted successfully')
      } else {
        // Handle error
        console.error('Failed to post job')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="h-auto mt-32 md:mt-48 text-center mx-auto">
        <h1 className='text-2xl font-bold'>Post a Job</h1>

        <form onSubmit={handleSubmit} className="form-control md:w-1/3 mx-auto gap-2 p-6">
          <input 
            type='text' 
            placeholder="Job title" 
            className="input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input 
            type='text' 
            placeholder="Job Company" 
            className="input input-bordered"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <div className="flex gap-2">
            <input 
              type='text' 
              placeholder="City" 
              className="input input-bordered w-1/2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input 
              type='text' 
              placeholder="Suburb" 
              className="input input-bordered w-1/2"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center input input-bordered gap-2 w-1/2">
              <h2 className='text-base'>$</h2>
              <input 
                type='text' 
                placeholder="Pay Rate" 
                className="" 
                value={pay}
                onChange={(e) => setPay(e.target.value)}
                required
              />
            </div>
            <div className="dropdown w-1/2">
              <div 
                tabIndex={0} 
                role="button" 
                className="btn w-full"
                onClick={() => setFrequency(prev => prev === "Per Hour" ? "Per Week" : prev === "Per Week" ? "Per Annum" : "Per Hour")}
              >
                {frequency}
              </div>
              <ul className='menu dropdown-content'>
                <li><a onClick={() => setFrequency("Per Hour")}>Per Hour</a></li>
                <li><a onClick={() => setFrequency("Per Week")}>Per Week</a></li>
                <li><a onClick={() => setFrequency("Per Annum")}>Per Annum</a></li>
              </ul>
            </div>
          </div>
          
          <textarea 
            name="description"
            placeholder="Description" 
            className="textarea textarea-bordered min-h-56 text-base" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className='btn btn-primary'>Post Job</button>
        </form>
      </div>
    </div>
  )
}

export default page
