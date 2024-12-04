import { Link } from "react-router-dom";

import german from "../assets/germany.webp"
import india from "../assets/india.webp"

import japan from "../assets/japan.jpg"


const LatestVisas = () => {
  const visas = [
    {
      id: 1,
      country: "Germany",
      image: german,
  
      visa_type: "Tourist Visa",
      processing_time: "5-7 Days",
      fee: "$50",
      validity: "6 Months",
      application_method: "Online",
    },
    {
      id: 2,
      country: "Japan",
      image: japan,
      visa_type: "Work Visa",
      processing_time: "10-15 Days",
      fee: "$100",
      validity: "1 Year",
      application_method: "Offline",
    },
    {
      id: 3,
      country: "India",
      image: india,
      visa_type: "Business Visa",
      processing_time: "3-5 Days",
      fee: "$80",
      validity: "1 Year",
      application_method: "Online",
    },
    // Add more visas here
  ];

  return (
    <section className="py-12 bg-light dark:bg-gray-800 transition duration-500">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Latest Visas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
        {visas.map((visa) => (
          <div key={visa.id} className="card shadow-md rounded-lg overflow-hidden bg-white">
            <img
              src={visa.image}
              alt={visa.country}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl text-center pb-2 font-semibold text-gray-900 ">
                {visa.country}
              </h3>
              <p className="text-gray-700 ">
                Type: {visa.visa_type}
              </p>
              <p className="text-gray-700 ">
                Processing Time: {visa.processing_time}
              </p>
              <p className="text-gray-700 ">
                Fee: {visa.fee}
              </p>
              <p className="text-gray-700 ">
                Validity: {visa.validity}
              </p>
              <p className="text-gray-700 ">
                Application Method: {visa.application_method}
              </p>
              <Link
                to={`/visa-details/${visa.id}`}
                className="btn btn-primary mt-4 w-full"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/all-visas"
          className="btn btn-secondary dark:btn-outline"
        >
          See All Visas
        </Link>
      </div>
    </section>
  );
};

export default LatestVisas;
