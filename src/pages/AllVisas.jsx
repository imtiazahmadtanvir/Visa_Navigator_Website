import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import usa from "../assets/germany.webp";

const AllVisas = () => {
  const LoaderData = useLoaderData(); // All visa data from loader
  const [visas, setVisas] = useState(LoaderData); // Filtered visas
  const [visaTypes, setVisaTypes] = useState([]); // Unique visa types
  const [selectedType, setSelectedType] = useState(""); // Selected filter type

  useEffect(() => {
    // Extract unique visa types
    const types = [...new Set(LoaderData.map((visa) => visa.visaType))];
    setVisaTypes(types);
  }, [LoaderData]);

  // Handle filtering
  const handleFilterChange = (event) => {
    const selected = event.target.value;
    setSelectedType(selected);

    if (selected === "") {
      setVisas(LoaderData); // Show all visas
    } else {
      setVisas(LoaderData.filter((visa) => visa.visaType === selected));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h1 className="text-3xl font-bold text-center mb-5">All Visas</h1>

        {/* Dropdown Filter */}
        <div className="flex justify-left mb-5">
          <select
            value={selectedType}
            onChange={handleFilterChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">All Visa Types</option>
            {visaTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Visa Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visas.map((visa) => (
            <div className="card bg-base-100 shadow-xl" key={visa._id}>
              <figure>
                <img
                  src={visa.countryImage || usa}
                  alt={visa.countryName}
                  className="w-full h-32 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{visa.countryName}</h3>
                <p>
                  <strong>Visa Type:</strong> {visa.visaType}
                </p>
                <p>
                  <strong>Processing Time:</strong> {visa.processingTime}
                </p>
                <p>
                  <strong>Fee:</strong> ${visa.fee}
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/add-visa/${visa._id}`} className="btn btn-primary">
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visas.length === 0 && (
          <p className="text-center text-gray-500 mt-5">No visas found for the selected type.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllVisas;
