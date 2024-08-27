"use client"

import Navbar from "@/components/Navbar";
import Search from "@/components/Home/Search";
import JobsCollection from "@/components/Home/JobsCollection";
import GoToSearch from "@/components/Home/GoToSearch";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto">
        <div className="">
          <Navbar />
          <Search />
        </div>
        <div className="">
          <JobsCollection />
        </div>
        <GoToSearch />
        <Footer />
      </div>
    </main>
  );
}
