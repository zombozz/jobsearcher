"use client";

import Navbar from "@/components/Navbar";
import AboutUsOverview from "@/components/About/AboutUsOverview";
import MissionValues from "@/components/About/MissionValues";
import Footer from "@/components/Footer";
import FAQ from "@/components/About/FAQ";

const AboutUsPage = () => {
  return (
    <main>
        <Navbar />
        <div className="">
            <AboutUsOverview />
            <MissionValues />
            <FAQ />
            <Footer />
        </div>
    </main>
  );
};

export default AboutUsPage;
