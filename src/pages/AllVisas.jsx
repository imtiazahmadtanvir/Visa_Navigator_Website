import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropTypes from 'prop-types'; 

const AllVisas = () => {
  const [visas, setVisas] = useState([]); // Declare state and setter for visas

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/add-visa")
      .then((res) => res.json())
      .then((data) => setVisas(data)) // Set the fetched data into the state
      .catch((error) => console.error("Error fetching visas:", error));
  }, []); // Empty dependency array to run this once when the component mounts

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h1 className="text-3xl font-bold text-center mb-5">All Visas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visas.map((visa) => (
            <div className="card bg-base-100 shadow-xl" key={visa._id}>
              <figure>
                <img
                  src={visa.countryImage}
                  alt={visa.countryName}
                  className="w-full h-32 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{visa.countryName}</h3>
                <p><strong>Visa Type:</strong> {visa.visaType}</p>
                <p><strong>Processing Time:</strong> {visa.processingTime}</p>
                <p><strong>Fee:</strong> {visa.fee}</p>
                <div className="card-actions justify-end">
                  <Link   to={`/visa-details`} className="btn btn-primary">
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

AllVisas.propTypes = {
  visas: PropTypes.array.isRequired,
};

export default AllVisas;
