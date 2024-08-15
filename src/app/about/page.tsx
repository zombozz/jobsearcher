"use client";

import Navbar from "@/components/Navbar";
import AboutUsOverview from "@/components/About/AboutUsOverview";
import MissionValues from "@/components/About/MissionValues";
import Footer from "@/components/Footer";

const AboutUsPage = () => {
  return (
    <main>
        <Navbar />
        <div className="pt-16">
            <AboutUsOverview />
            <MissionValues />
            <Footer />
        </div>
    </main>
  );
};

export default AboutUsPage;
