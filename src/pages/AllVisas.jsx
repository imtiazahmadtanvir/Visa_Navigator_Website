import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        "countryImage": "https://via.placeholder.com/100x60?text=Germany",
        "visaType": "Tourist Visa",
        "processingTime": "15 days",
        "fee": "50 USD",
        "validity": "1 year",
        "applicationMethod": "Online"
      },
      {
        "id": 2,
        "country": "Canada",
        "countryImage": "https://via.placeholder.com/100x60?text=Canada",
        "visaType": "Student Visa",
        "processingTime": "20 days",
        "fee": "80 USD",
        "validity": "2 years",
        "applicationMethod": "Online"
      },
      {
        "id": 3,
        "country": "Australia",
        "countryImage": "https://via.placeholder.com/100x60?text=Australia",
        "visaType": "Tourist Visa",
        "processingTime": "10 days",
        "fee": "60 USD",
        "validity": "1 year",
        "applicationMethod": "Online"
      },
      {
        "id": 4,
        "country": "Japan",
        "countryImage": "https://via.placeholder.com/100x60?text=Japan",
        "visaType": "Business Visa",
        "processingTime": "5 days",
        "fee": "100 USD",
        "validity": "6 months",
        "applicationMethod": "In-person"
      },
      {
        "id": 5,
        "country": "India",
        "countryImage": "https://via.placeholder.com/100x60?text=India",
        "visaType": "Tourist Visa",
        "processingTime": "15 days",
        "fee": "40 USD",
        "validity": "6 months",
        "applicationMethod": "Online"
      },
      {
        "id": 6,
        "country": "UK",
        "countryImage": "https://via.placeholder.com/100x60?text=UK",
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

export default AllVisas;
