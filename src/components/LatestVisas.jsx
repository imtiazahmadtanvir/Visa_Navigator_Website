import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import default_Img from "../assets/Australia.webp"; // Fallback image

const LatestVisas = () => {
  const [visas, setVisas] = useState([]); // State to store visa data
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Fetch visa data from the backend
    fetch("https://visa-navigator-server-omega.vercel.app/add-visa")
      .then((res) => res.json())
      .then((data) => {
        setVisas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visas:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-light dark:bg-gray-800 transition duration-500">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Loading Latest Visas...
        </h2>
      </section>
    );
  }

  return (
    <section className="py-12 bg-light dark:bg-gray-800 transition duration-500">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Latest Visas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
        {visas.length > 0 ? (
          visas.map((visa) => (
            <div
              key={visa._id}
              className="card shadow-md rounded-lg overflow-hidden bg-white"
            >
              <img
                src={visa.countryImage || default_Img} // Use fallback image if countryImage is not provided
                alt={visa.countryName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl text-center pb-2 font-semibold text-gray-900">
                  {visa.countryName}
                </h3>
                <p className="text-gray-700">Type: {visa.visaType}</p>
                <p className="text-gray-700">
                  Processing Time: {visa.processingTime}
                </p>
                <p className="text-gray-700">Fee: ${visa.fee}</p>
                <p className="text-gray-700">Validity: {visa.validity}</p>
                <p className="text-gray-700">
                  Application Method: {visa.applicationMethod}
                </p>
                <Link
                  to={`/visa-details/${visa._id}`}
                  className="btn btn-primary mt-4 w-full"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No visas available.</p>
        )}
      </div>
      <div className="text-center mt-8">
        <Link to="/all-visas" className="btn btn-secondary dark:btn-outline">
          See All Visas
        </Link>
      </div>
    </section>
  );
};

export default LatestVisas;
