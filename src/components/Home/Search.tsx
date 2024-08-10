"use client";

import { useState, ChangeEvent } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const Search = () => {
  interface TextInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }

  const [jobSearchValue, setJobSearchValue] = useState("");
  const [locationSearchValue, setLocationSearchValue] = useState("");

  const handleJobSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setJobSearchValue(e.target.value);
  }
  const handleLocationSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationSearchValue(e.target.value);
  }


  return (
    <section className="w-full border border-b-2 flex justify-center align-middle py-10">
      <div className="flex flex-row gap-4">
        <div className="input input-bordered flex join-horizontal">
          <FaSearch className="w-5 h-5 text-gray-500 my-auto mr-2" />
          <input
            type="text"
            value={jobSearchValue}
            onChange={handleJobSearch}
            placeholder="Search Jobs"
            className="w-full max-w-xs"
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
          />
        </div>
          <button className='btn btn-primary text-white'>Search</button>
      </div>
    </section>
  );
};

export default Search;