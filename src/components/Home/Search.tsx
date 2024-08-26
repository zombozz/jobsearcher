"use client";

import { useState, ChangeEvent } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [jobSearchValue, setJobSearchValue] = useState("");
  const [locationSearchValue, setLocationSearchValue] = useState("");
  const router = useRouter();

  const handleJobSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setJobSearchValue(e.target.value);
  }

  const handleLocationSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationSearchValue(e.target.value);
  }

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (jobSearchValue) query.set('job', jobSearchValue);
    if (locationSearchValue) query.set('location', locationSearchValue);
    router.push(`/?${query.toString()}`);
  };

  return (
    <section className="border-b-2 flex justify-center align-middle py-4 md:py-10 bg-red-400 sticky mt-16 z-10">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="input input-bordered flex join-horizontal">
          <FaSearch className="w-5 h-5 text-gray-500 my-auto mr-2" />
          <input
            type="text"
            value={jobSearchValue}
            onChange={handleJobSearch}
            placeholder="Search Jobs"
            className="w-full max-w-xs"
            onKeyDown={
              (e) => {
                if(e.key == 'Enter'){
                  handleSearch()
                }
              }
            }
          />
        </div>
        <div className="input input-bordered flex join-horizontal">
          <FaMapMarkerAlt className="w-5 h-5 text-gray-500 my-auto mr-2" />
          <input
            type="text"
            value={locationSearchValue}
            onChange={handleLocationSearch}
            placeholder="Location"
            className="w-full max-w-xs"
            onKeyDown={
              (e) => {
                if(e.key == 'Enter'){
                  handleSearch()
                }
              }
            }
          />
        </div>
        <button className='btn btn-primary text-white' onClick={handleSearch}>Search</button>
      </div>
    </section>
  );
};

export default Search;
