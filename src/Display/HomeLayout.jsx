import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LatestVisas from "../components/LatestVisas";
import TopDestinations from "../components/TopDestinations";
import Testimonials from "../components/Testimonials";
import FloatingChatbot from "../components/FloatingChatbot";
// import { Fade } from "react-awesome-reveal";


const HomeLayout = () => {
  const latestVisas = [
    {
      id: 1,
      country: "Canada",
      countryImage: "canada.jpg",
      visaType: "Tourist Visa",
      processingTime: "2-4 weeks",
      fee: "$100",
      validity: "6 months",
      applicationMethod: "Online",
    },
    {
      id: 2,
      country: "USA",
      countryImage: "usa.jpg",
      visaType: "Work Visa",
      processingTime: "1-2 months",
      fee: "$160",
      validity: "1 year",
      applicationMethod: "Offline",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Banner />
      
      <div className="w-11/12 mx-auto py-12">
        <LatestVisas visas={latestVisas} />
      </div>

      <div className="w-11/12 mx-auto py-12">
        <TopDestinations />
      </div>

      <div className="w-11/12 mx-auto py-12">
        <Testimonials />
      </div>

      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default HomeLayout;
