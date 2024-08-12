"use client"

import React from 'react'
import { useLocalStorageUser } from '@/components/useLocalStorageUser';
import Navbar from '@/components/Navbar';

const page = () => {
  const user = useLocalStorageUser();
  return (
    <div>
      <Navbar />
      <div className="bg-blue-500 h-56">
        <h1>{localStorage.getItem('user')}</h1>
        <h1>hi</h1>

        <div className="form-control">
          <input type='text' placeholder="Job title" className="input"/>
          <input type='text' placeholder="Job Company" className="input" />
          <input type='text' placeholder="Location" className="input" />
          <input type='text' placeholder="Pay" className="input" />
          <input type='text' placeholder="Description" className="input-lg" />
        </div>


      </div>
    </div>
  )
}

export default page