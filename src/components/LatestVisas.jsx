// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import default_Img from "../assets/Australia.webp"; // Fallback image

// const LatestVisas = () => {
//   const [visas, setVisas] = useState([]); // State to store visa data
//   const [loading, setLoading] = useState(true); // State to manage loading status

//   useEffect(() => {

//     fetch("https://visa-navigator-server-omega.vercel.app/add-visa")
//       .then((res) => res.json())
//       .then((data) => {
//         setVisas(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching visas:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <section className="py-12 bg-light dark:bg-gray-800 transition duration-500">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
//           Loading Latest Visas...
//         </h2>
//       </section>
//     );
//   }

//   return (
//     <section className="py-12 bg-light dark:bg-gray-800 transition duration-500">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
//         Latest Visas
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
//         {visas.length > 0 ? (
//           visas.map((visa) => (
//             <div
//               key={visa._id}
//               className="card shadow-md rounded-lg overflow-hidden bg-white"
//             >
//               <img
//                 src={visa.countryImag || default_Img} // Use fallback image if countryImage is not provided
//                 alt={visa.countryName}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-2xl text-center pb-2 font-semibold text-gray-900">
//                   {visa.countryName}
//                 </h3>
//                 <p className="text-gray-700">Type: {visa.visaType}</p>
//                 <p className="text-gray-700">
//                   Processing Time: {visa.processingTime}
//                 </p>
//                 <p className="text-gray-700">Fee: ${visa.fee}</p>
//                 <p className="text-gray-700">Validity: {visa.validity}</p>
//                 <p className="text-gray-700">
//                   Application Method: {visa.applicationMethod}
//                 </p>
//                 <Link
//                   to={`/add-visa/${visa._id}`}
//                   className="btn btn-primary bg-yellow-400 text-gray-800 border-none font-semibold px-10 py-3 rounded-lg hover:bg-yellow-500 hover:shadow-md transition dark:bg-yellow-500 dark:hover:bg-yellow-600 w-full mx-auto"
//                   >
//                   See Details
//                 </Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No visas available.</p>
//         )}
//       </div>
//       <div className="text-center mt-8">
//         <Link to="/all-visas" 
//             className="btn btn-primary bg-yellow-400 text-gray-800 border-none font-semibold px-10 py-3 rounded-lg hover:bg-yellow-500 hover:shadow-md transition dark:bg-yellow-500 dark:hover:bg-yellow-600"
//             >
//           See All Visas
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default LatestVisas;


// "use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, Clock, DollarSign, Calendar, ExternalLink, Search, Filter, ChevronRight } from "lucide-react"
import defaultImg from "../assets/Australia.webp" // Fallback image

const LatestVisas = () => {
  const [visas, setVisas] = useState([])
  const [filteredVisas, setFilteredVisas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [visaTypes, setVisaTypes] = useState([])

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch("https://visa-navigator-server-omega.vercel.app/add-visa")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        // Get only the latest 6 visas
        const latestVisas = data.slice(0, 6)
        setVisas(latestVisas)
        setFilteredVisas(latestVisas)

        // Extract unique visa types for filter
        const types = [...new Set(data.map((visa) => visa.visaType))].filter(Boolean)
        setVisaTypes(types)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching visas:", error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchVisas()
  }, [])

  // Handle search and filter
  useEffect(() => {
    if (visas.length > 0) {
      let results = [...visas]

      // Apply search term filter
      if (searchTerm) {
        results = results.filter(
          (visa) =>
            visa.countryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            visa.visaType?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      // Apply visa type filter
      if (selectedType) {
        results = results.filter((visa) => visa.visaType === selectedType)
      }

      setFilteredVisas(results)
    }
  }, [searchTerm, selectedType, visas])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  // Skeleton loader for cards
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-4"></div>
      </div>
    </div>
  )

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We could not load the latest visas. Please try again later.
            </p>
            <p className="text-red-500 dark:text-red-400 text-sm mb-6">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Retry please
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition duration-500">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Latest Visa Opportunities
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most recent visa options available for your next international journey.
          </p>
        </motion.div>

        {/* Search and Filter */}
        {!loading && visas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search by country or visa type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="relative min-w-[180px]">
                <Filter className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none"
                >
                  <option value="">All Visa Types</option>
                  {visaTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Visa Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredVisas.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVisas.map((visa) => (
              <motion.div
                key={visa._id}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={visa.countryImage || defaultImg}
                    alt={visa.countryName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.src = defaultImg
                      e.target.onerror = null
                    }}
                  />
                  <div className="absolute top-0 right-0 m-3">
                    <span className="px-3 py-1 bg-yellow-400/90 text-gray-800 text-xs font-medium rounded-full">
                      {visa.visaType || "General Visa"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white">{visa.countryName || "Unknown Country"}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <MapPin size={16} className="mr-2 text-yellow-500" />
                      <span>{visa.countryName || "Unknown Country"}</span>
                    </div>

                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Clock size={16} className="mr-2 text-yellow-500" />
                      <span>Processing: {visa.processingTime || "Contact for details"}</span>
                    </div>

                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <DollarSign size={16} className="mr-2 text-yellow-500" />
                      <span>Fee: ${visa.fee || "0"}</span>
                    </div>

                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Calendar size={16} className="mr-2 text-yellow-500" />
                      <span>Validity: {visa.validity || "Contact for details"}</span>
                    </div>
                  </div>

                  <Link
                    to={`/visa-details/${visa._id}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    View Details
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">No visas found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedType("")
              }}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* See All Button */}
        {!loading && visas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/all-visas"
              className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Explore All Visa Options
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default LatestVisas

