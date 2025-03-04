import { Link } from "react-router-dom";
import usa from "../assets/usa.jpg"
import can from "../assets/Canada.jpg"
import aus from "../assets/Australia.webp"



const TopDestinations = () => {
  const destinations = [
    {
      id: 1,
      country: "USA",
      image: usa,
      stats: "10,000 Visas Approved",
    },
    {
      id: 2,
      country: "Canada",
      image: can,
      stats: "8,500 Visas Approved",
    },
    {
      id: 3,
      country: "Australia",
      image: aus,
      stats: "7,000 Visas Approved",
    },
  ];

  return (
    <section className="py-12 bg-light  dark:bg-gray-800 transition duration-500">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Top Visa Destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto ">
        {destinations.map((destination) => (
          <div key={destination.id} className="card shadow-lg rounded-lg overflow-hidden bg-white dark:bg-white">
            <img
              src={destination.image}
              alt={destination.country}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-2xl font-semibold text-gray-900">
                {destination.country}
              </h3>
              <p className="text-sm text-gray-600 ">
                {destination.stats}
              </p>
              <Link
                to={`/all-visas?country=${destination.country}`}
                className="btn mt-5 btn-primary bg-yellow-500 text-gray-800 border-none font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 hover:shadow-md transition dark:bg-yellow-500  dark:hover:bg-yellow-600 w-1/2 mx-auto"
                >
                Explore Visas
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;
