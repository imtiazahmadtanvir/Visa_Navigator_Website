import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VisaDetails = () => {
  const { id } = useParams(); // Get the _id from the URL
  const [visaData, setVisaData] = useState(null);

  useEffect(() => {
    // Fetch visa details based on the _id
    fetch(`http://localhost:5000/add-visa/${id}`)
      .then((res) => res.json())
      .then((data) => setVisaData(data))
      .catch((error) => console.error("Error fetching visa details:", error));
  }, [id]); // Run this when the component mounts or _id changes

  if (!visaData) return <div>Loading...</div>; // Loading state

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold">{visaData.countryName} Visa Details</h1>
        <div className="bg-base-100 shadow-lg p-6 mt-4">
          <p><strong>Visa Type:</strong> {visaData.visaType}</p>
          <p><strong>Processing Time:</strong> {visaData.processingTime}</p>
          <p><strong>Fee:</strong> {visaData.fee}</p>
          <p><strong>Country:</strong> {visaData.countryName}</p>
          <p><strong>Description:</strong> {visaData.description}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisaDetails;
