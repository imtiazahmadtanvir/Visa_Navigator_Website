import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LatestVisas from "../components/LatestVisas";
import TopDestinations from "../components/TopDestinations";
import Testimonials from "../components/Testimonials";
// import { Fade } from "react-awesome-reveal";


const HomeLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


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
    // Add more visa objects here...
  ];


  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <div className="flex justify-end p-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm">Light</span>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
            className="toggle toggle-primary"
          />
          <span className="text-sm">Dark</span>
        </label>
      </div>

      <Banner />
      <div className="w-11/12 mx-auto">
      <LatestVisas visas={latestVisas} />

      </div>
      <div className="w-11/12 mx-auto">
      <TopDestinations></TopDestinations>

      </div>
      <div className="w-11/12 mx-auto mb-4 ">
      <Testimonials></Testimonials>

      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
