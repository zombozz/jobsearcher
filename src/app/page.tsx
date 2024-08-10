"use client";

import Navbar from "@/components/Navbar";
import Search from "@/components/Home/Search";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto">
        <Navbar />
        <Search />
        {/* <Footer /> */}
      </div>
    </main>
  );
}
