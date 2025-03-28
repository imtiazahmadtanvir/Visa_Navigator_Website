/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import { Link, useLoaderData } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import usa from "../assets/germany.webp";

// const AllVisas = () => {
//   const LoaderData = useLoaderData(); // All visa data from loader
//   const [visas, setVisas] = useState(LoaderData); // Filtered visas
//   const [visaTypes, setVisaTypes] = useState([]); // Unique visa types
//   const [selectedType, setSelectedType] = useState(""); // Selected filter type

//   useEffect(() => {
//     // Extract unique visa types
//     const types = [...new Set(LoaderData.map((visa) => visa.visaType))];
//     setVisaTypes(types);
//   }, [LoaderData]);

//   // Handle filtering
//   const handleFilterChange = (event) => {
//     const selected = event.target.value;
//     setSelectedType(selected);

//     if (selected === "") {
//       setVisas(LoaderData); // Show all visas
//     } else {
//       setVisas(LoaderData.filter((visa) => visa.visaType === selected));
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto py-5">
//         <h1 className="text-3xl font-bold text-center mb-5">All Visas</h1>

//         {/* Dropdown Filter */}
//         <div className="flex justify-left mb-5">
//           <select
//             value={selectedType}
//             onChange={handleFilterChange}
//             className="select select-bordered w-full max-w-xs"
//           >
//             <option value="">All Visa Types</option>
//             {visaTypes.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Visa Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {visas.map((visa) => (
//             <div className="card bg-base-100 shadow-xl" key={visa._id}>
//               <figure>
//                 <img
//                   src={visa.countryImage || usa}
//                   alt={visa.countryName}
//                   className="w-full h-32 object-cover"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h3 className="card-title">{visa.countryName}</h3>
//                 <p>
//                   <strong>Visa Type:</strong> {visa.visaType}
//                 </p>
//                 <p>
//                   <strong>Processing Time:</strong> {visa.processingTime}
//                 </p>
//                 <p>
//                   <strong>Fee:</strong> ${visa.fee}
//                 </p>
//                 <div className="card-actions justify-end">
//                   <Link to={`/add-visa/${visa._id}`} 
//                 className="btn mt-5 btn-primary bg-yellow-500 text-gray-800 border-none font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 hover:shadow-md transition dark:bg-yellow-500  dark:hover:bg-yellow-600 w-full mx-auto"
//                 >
//                     See Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {visas.length === 0 && (
//           <p className="text-center text-gray-500 mt-5">No visas found for the selected type.</p>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AllVisas;


"use client"

import { useEffect, useState, useRef } from "react"
import { Link, useLoaderData, useSearchParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  ChevronDown,
  X,
  Grid,
  List,
  ArrowUpRight,
  SlidersHorizontal,
  Globe,
  ArrowUp,
  Loader2,
} from "lucide-react"
import defaultImage from "../assets/germany.webp"

const AllVisas = () => {
  const LoaderData = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // States
  const [visas, setVisas] = useState(LoaderData)
  const [filteredVisas, setFilteredVisas] = useState(LoaderData)
  const [visaTypes, setVisaTypes] = useState([])
  const [countries, setCountries] = useState([])
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "")
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get("country") || "")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [sortBy, setSortBy] = useState("country")
  const [isGridView, setIsGridView] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const resultsRef = useRef(null)

  // Extract unique visa types and countries
  useEffect(() => {
    // Extract unique visa types and countries
    const types = [...new Set(LoaderData.map((visa) => visa.visaType))].filter(Boolean)
    const countryList = [...new Set(LoaderData.map((visa) => visa.countryName))].filter(Boolean)

    setVisaTypes(types)
    setCountries(countryList)

    // Initialize filtered visas with LoaderData directly
    setFilteredVisas(LoaderData)

    // Only apply filters from URL if they exist
    if (searchParams.get("type") || searchParams.get("country") || searchParams.get("search")) {
      applyFilters()
    } else {
      // Make sure loading state is false if no filters to apply
      setIsLoading(false)
    }

    // Add scroll listener for back-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [LoaderData])

  // Apply all filters
  const applyFilters = () => {
    setIsLoading(true)

    // Start with all visas
    let results = [...LoaderData]

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (visa) =>
          visa.countryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visa.visaType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visa.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply type filter
    if (selectedType) {
      results = results.filter((visa) => visa.visaType === selectedType)
    }

    // Apply country filter
    if (selectedCountry) {
      results = results.filter((visa) => visa.countryName === selectedCountry)
    }

    // Apply sorting
    results = sortVisas(results, sortBy)

    // Update URL params
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (selectedType) params.set("type", selectedType)
    if (selectedCountry) params.set("country", selectedCountry)
    setSearchParams(params)

    // Apply the filtered results immediately to prevent loading state getting stuck
    setFilteredVisas(results)
    setIsLoading(false)
  }

  // Sort visas based on selected criteria
  const sortVisas = (visaList, criterion) => {
    switch (criterion) {
      case "country":
        return [...visaList].sort((a, b) => (a.countryName || "").localeCompare(b.countryName || ""))
      case "fee-low":
        return [...visaList].sort((a, b) => Number.parseFloat(a.fee || 0) - Number.parseFloat(b.fee || 0))
      case "fee-high":
        return [...visaList].sort((a, b) => Number.parseFloat(b.fee || 0) - Number.parseFloat(a.fee || 0))
      case "processing":
        return [...visaList].sort((a, b) => (a.processingTime || "").localeCompare(b.processingTime || ""))
      default:
        return visaList
    }
  }

  // Handle filter changes
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setFilteredVisas(sortVisas(filteredVisas, e.target.value))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    applyFilters()
  }

  const clearFilters = () => {
    setIsLoading(true)
    setSelectedType("")
    setSelectedCountry("")
    setSearchQuery("")
    setFilteredVisas(LoaderData)
    setSearchParams({})
    setIsLoading(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Apply filters when filter values change
  useEffect(() => {
    // Only apply filters if at least one of the dependencies has changed
    // and avoid multiple consecutive filter applications
    const timeoutId = setTimeout(() => {
      applyFilters()
    }, 100)

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId)
  }, [selectedType, selectedCountry])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400/90 to-amber-500/90 dark:from-yellow-600/90 dark:to-amber-700/90">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Explore Global Visa Opportunities
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Discover visa options for countries around the world. Find the perfect visa for your travel, study, or
              work needs.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search by country or visa type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pr-12 rounded-full border-none shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-colors"
              >
                <Search size={20} />
              </button>
            </form>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              onClick={scrollToResults}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full backdrop-blur-sm transition-colors"
            >
              Explore All Visas
              <ChevronDown size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12" ref={resultsRef}>
        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Filter Options</h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-md ${isGridView ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>

              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-md ${!isGridView ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                aria-label="List view"
              >
                <List size={20} />
              </button>

              <div className="hidden md:block h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="country">Sort by Country</option>
                  <option value="fee-low">Price: Low to High</option>
                  <option value="fee-high">Price: High to Low</option>
                  <option value="processing">Processing Time</option>
                </select>
                <SlidersHorizontal
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="md:flex items-end gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visa Type</label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">All Visa Types</option>
                    {visaTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">All Countries</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedType || selectedCountry || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm">
                  <span>Search: {searchQuery}</span>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      applyFilters()
                    }}
                    className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {selectedType && (
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                  <span>Type: {selectedType}</span>
                  <button
                    onClick={() => setSelectedType("")}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {selectedCountry && (
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                  <span>Country: {selectedCountry}</span>
                  <button
                    onClick={() => setSelectedCountry("")}
                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 size={20} className="animate-spin mr-2" />
                Loading visas...
              </span>
            ) : (
              <span>
                Found <span className="text-yellow-500">{filteredVisas.length}</span> visa options
              </span>
            )}
          </h2>
        </div>

        {/* Visa Cards */}
        {isLoading ? (
          <div
            className={`grid ${isGridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}
          >
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredVisas.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid ${isGridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}
          >
            <AnimatePresence>
              {filteredVisas.map((visa) => (
                <motion.div
                  key={visa._id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -5 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${!isGridView && "flex flex-col md:flex-row"}`}
                >
                  <div className={`relative ${!isGridView && "md:w-1/3"}`}>
                    <img
                      src={visa.countryImage || defaultImage}
                      alt={visa.countryName}
                      className={`w-full ${isGridView ? "h-48" : "h-48 md:h-full"} object-cover`}
                      onError={(e) => {
                        e.target.src = defaultImage
                        e.target.onerror = null
                      }}
                    />
                    <div className="absolute top-0 right-0 m-3">
                      <span className="px-3 py-1 bg-yellow-400/90 text-gray-800 text-xs font-medium rounded-full">
                        {visa.visaType || "General Visa"}
                      </span>
                    </div>
                    {!isGridView && (
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-t md:from-black/60 md:to-transparent flex items-end md:items-center">
                        <div className="p-4 md:p-6">
                          <h3 className="text-xl font-bold text-white">{visa.countryName || "Unknown Country"}</h3>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`p-5 ${!isGridView && "md:w-2/3"}`}>
                    {isGridView && (
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                        <MapPin size={18} className="mr-2 text-yellow-500" />
                        {visa.countryName || "Unknown Country"}
                      </h3>
                    )}

                    <div className="space-y-2 mb-4">
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

                      {!isGridView && visa.description && (
                        <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{visa.description}</p>
                      )}
                    </div>

                    <Link
                      to={`/visa-details/${visa._id}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition-colors"
                    >
                      View Details
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md"
          >
            <Globe size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Visas Found</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              We could not find any visas matching your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-full shadow-lg z-50"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default AllVisas

