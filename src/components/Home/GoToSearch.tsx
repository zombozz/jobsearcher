"use client"

import React, { useEffect, useState } from 'react'

const GoToSearch = () => {

  const [isVisibleGTS, setIsVisibleGTS] = useState(false)

  const goToSearch = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Enables smooth scrolling
    });
    setIsVisibleGTS(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisibleGTS(true);
      } else {
        setIsVisibleGTS(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
    className={`md:hidden fixed w-full z-30 bottom-0 flex justify-center backdrop-blur-sm
      ${isVisibleGTS ? 'flex' : 'hidden'
    }`} 
    onClick={goToSearch}
    >
      <button className='w-7/8 bg-white py-3 my-2 px-12 border border-gray-400 rounded-3xl'>Go to search</button>
    </div>
  )
}

export default GoToSearch