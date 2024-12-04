import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import german from "../assets/germany.webp"
import india from "../assets/india.webp"
import japan from "../assets/japan.jpg"
import aus from "../assets/Australia.webp"
import can from "../assets/Canada.jpg"
import usa from "../assets/india.webp"
import PropTypes from 'prop-types'; // Import PropTypes for validation

// Visa Card Component
const VisaCard = ({ visa }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={visa.countryImage} alt={visa.country} className="w-full h-32 object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{visa.country}</h3>
        <p><strong>Visa Type:</strong> {visa.visaType}</p>
        <p><strong>Processing Time:</strong> {visa.processingTime}</p>
        <p><strong>Fee:</strong> {visa.fee}</p>
        <div className="card-actions justify-end">
          <Link to={`/visa-details`} className="btn btn-primary">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const AllVisas = () => {

  const [visas, setVisas] = useState([]);

  useEffect(() => {
    // Fetch the visas data (this will be replaced with real API data in the future)
    const visaData = [
      {
        "id": 1,
        "country": "Germany",
        "countryImage": german,
        "visaType": "Tourist Visa",
        "processingTime": "15 days",
        "fee": "50 USD",
        "validity": "1 year",
        "applicationMethod": "Online"
      },
      {
        "id": 2,
        "country": "Canada",
        "countryImage": can,
        "visaType": "Student Visa",
        "processingTime": "20 days",
        "fee": "80 USD",
        "validity": "2 years",
        "applicationMethod": "Online"
      },
      {
        "id": 3,
        "country": "Australia",
        "countryImage": aus,
        "visaType": "Tourist Visa",
        "processingTime": "10 days",
        "fee": "60 USD",
        "validity": "1 year",
        "applicationMethod": "Online"
      },
      {
        "id": 4,
        "country": "Japan",
        "countryImage": japan,
        "visaType": "Business Visa",
        "processingTime": "5 days",
        "fee": "100 USD",
        "validity": "6 months",
        "applicationMethod": "In-person"
      },
      {
        "id": 5,
        "country": "India",
        "countryImage": india,
        "visaType": "Tourist Visa",
        "processingTime": "15 days",
        "fee": "40 USD",
        "validity": "6 months",
        "applicationMethod": "Online"
      },
      {
        "id": 6,
        "country": "USA",
        "countryImage": usa,
        "visaType": "Student Visa",
        "processingTime": "20 days",
        "fee": "90 USD",
        "validity": "1 year",
        "applicationMethod": "Online"
      }
    ];
    setVisas(visaData);
  }, []);

  return (
    
<div>
    <nav>
           <Navbar></Navbar>
    </nav>
<div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold text-center mb-5">All Visas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visas.map((visa) => (
          <VisaCard key={visa.id} visa={visa} />
        ))}
      </div>
    </div>

         <footer><Footer></Footer></footer>
</div>
  );
};

// PropTypes for the VisaCard component
VisaCard.propTypes = {
  visa: PropTypes.shape({
    country: PropTypes.string.isRequired,
    countryImage: PropTypes.string.isRequired,
    visaType: PropTypes.string.isRequired,
    processingTime: PropTypes.string.isRequired,
    fee: PropTypes.string.isRequired,
    validity: PropTypes.string.isRequired,
    applicationMethod: PropTypes.string.isRequired,
  }).isRequired,
};


export default AllVisas;
