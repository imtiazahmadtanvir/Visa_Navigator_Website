/* eslint-disable no-unused-vars */
// import { useLoaderData } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const MyVisaApplication = () => {
//   const Loaderdata = useLoaderData(); 
//   const [visas, setVisas] = useState(Loaderdata); 
//   const [searchQuery, setSearchQuery] = useState(""); 

//   const handleCancel = (_id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`https://visa-navigator-server-omega.vercel.app/apply-visa/${_id}`, {
//           method: "DELETE",
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.deletedCount > 0) {
//               Swal.fire("Deleted!", "Your visa application has been deleted.", "success");
//               setVisas(visas.filter((visa) => visa._id !== _id)); // Update the UI
//             }
//           })
//           .catch((error) => {
//             console.error("Error deleting visa:", error);
//             Swal.fire("Error!", "Something went wrong. Please try again.", "error");
//           });
//       }
//     });
//   };

//   // Handle search functionality
//   const handleSearch = () => {
//     const filteredVisas = Loaderdata.filter((visa) =>
//       visa.country.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setVisas(filteredVisas);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header Section */}
//       <header>
//         <Navbar />
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto p-5">
//         <h1 className="text-2xl font-bold mb-4 w-full mx-auto">My Visa Applications</h1>

//         {/* Search Section */}
//         <div className="flex gap-4 mb-6 mx-auto w-full">
//           <input
//             type="text"
//             placeholder="Search by country name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} // Update search query
//             className="input input-bordered w-full max-w-md"
//           />
//           <button onClick={handleSearch} className="btn btn-primary text-gray-800 dark:text-gray-200 bg-yellow-500 border-none hover:bg-yellow-600">
//             Search
//           </button>
//         </div>

//         {/* Visa Applications */}
//         {visas.length > 0 ? (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {visas.map((visa) => (
//               <div key={visa._id} className="card  bg-base-100 shadow-lg p-4 border rounded">
//                 <img
//                   src={visa.countryImage}
//                   alt={visa.country}
//                   className="w-full h-40 object-cover rounded mb-4"
//                 />
//                 <h2 className="text-lg font-semibold mb-2">{visa.country}</h2>
//                 <p><strong>Visa Type:</strong> {visa.visaType}</p>
//                 <p><strong>Processing Time:</strong> {visa.processingTime}</p>
//                 <p><strong>Fee:</strong> ${visa.fee}</p>
//                 <p><strong>Validity:</strong> {visa.validity}</p>
//                 <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
//                 <p><strong>Applied Date:</strong> {visa.appliedDate}</p>
//                 <p><strong>Applicant:</strong> {visa.firstName} {visa.lastName}</p>
//                 <p><strong>Email:</strong> {visa.email}</p>
//                 <button
//                   onClick={() => handleCancel(visa._id)}
//                   className="btn bg-red-500 text-white mt-4"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No visa applications found.</p>
//         )}
//       </main>

//       {/* Footer Section */}
//       <footer className="mt-auto">
//         <Footer />
//       </footer>
//     </div>
//   );
// };

// export default MyVisaApplication;


"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useLoaderData } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2"
import { Search, X, Trash2, Clock, DollarSign, Calendar, Send, Mail, User, Loader2, Filter, SortDesc, MapPin, Globe, CalendarIcon, ArrowUpCircle } from 'lucide-react'

const MyVisaApplication = () => {
  const initialData = useLoaderData()
  const [visas, setVisas] = useState(initialData)
  const [filteredVisas, setFilteredVisas] = useState(initialData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [sortBy, setSortBy] = useState("newest")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])
  const [viewMode, setViewMode] = useState("grid") // grid or list

  // Get unique countries for filter dropdown
  const uniqueCountries = useMemo(() => {
    const countries = [...new Set(initialData.map(visa => visa.country))]
    return countries.sort()
  }, [initialData])

  // Get unique visa types for filter dropdown
  const uniqueVisaTypes = useMemo(() => {
    const types = [...new Set(initialData.map(visa => visa.visaType))]
    return types.sort()
  }, [initialData])

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Apply filters and search
  useEffect(() => {
    setIsSearching(true)
    
    // Apply search and filters with a small delay to avoid UI freezing
    const timer = setTimeout(() => {
      let results = [...initialData]
      
      // Apply search query
      if (searchQuery.trim()) {
        results = results.filter(visa => 
          visa.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visa.visaType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${visa.firstName} ${visa.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      // Apply active filters
      if (activeFilters.length > 0) {
        results = results.filter(visa => 
          activeFilters.includes(visa.country) || activeFilters.includes(visa.visaType)
        )
      }
      
      // Apply sorting
      if (sortBy === "newest") {
        results.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
      } else if (sortBy === "oldest") {
        results.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate))
      } else if (sortBy === "fee-high") {
        results.sort((a, b) => b.fee - a.fee)
      } else if (sortBy === "fee-low") {
        results.sort((a, b) => a.fee - b.fee)
      }
      
      setFilteredVisas(results)
      setIsSearching(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchQuery, activeFilters, sortBy, initialData])

  const handleCancel = useCallback((_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingId(_id)
        setIsLoading(true)
        fetch(`https://visa-navigator-server-omega.vercel.app/apply-visa/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            setIsLoading(false)
            setDeletingId(null)
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Cancelled!",
                text: "Your visa application has been cancelled.",
                icon: "success",
              })
              setVisas(prevVisas => prevVisas.filter(visa => visa._id !== _id))
              setFilteredVisas(prevVisas => prevVisas.filter(visa => visa._id !== _id))
            }
          })
          .catch((error) => {
            setIsLoading(false)
            setDeletingId(null)
            console.error("Error cancelling visa:", error)
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            })
          })
      }
    })
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    setActiveFilters([])
    setSortBy("newest")
    setFilteredVisas(initialData)
  }, [initialData])

  const toggleFilter = useCallback((filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    )
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const filterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">My Visa Applications</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Track and manage your visa applications in one place.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={filterVariants}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              {/* Search Bar */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search by country, visa type, or applicant name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsSearching(true)}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />

                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex flex-wrap gap-2 items-center justify-between">
                {/* Filter Dropdowns */}
                <div className="flex flex-wrap gap-2">
                  {/* Country Filter */}
                  <div className="relative group">
                    <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center gap-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Globe size={16} />
                      <span>Country</span>
                    </button>
                    <div className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 w-48 hidden group-hover:block">
                      <div className="max-h-48 overflow-y-auto">
                        {uniqueCountries.map(country => (
                          <div key={country} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            <input 
                              type="checkbox" 
                              id={`country-${country}`}
                              checked={activeFilters.includes(country)}
                              onChange={() => toggleFilter(country)}
                              className="mr-2"
                            />
                            <label htmlFor={`country-${country}`} className="text-sm cursor-pointer flex-grow">
                              {country}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visa Type Filter */}
                  <div className="relative group">
                    <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center gap-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Filter size={16} />
                      <span>Visa Type</span>
                    </button>
                    <div className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 w-48 hidden group-hover:block">
                      <div className="max-h-48 overflow-y-auto">
                        {uniqueVisaTypes.map(type => (
                          <div key={type} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            <input 
                              type="checkbox" 
                              id={`type-${type}`}
                              checked={activeFilters.includes(type)}
                              onChange={() => toggleFilter(type)}
                              className="mr-2"
                            />
                            <label htmlFor={`type-${type}`} className="text-sm cursor-pointer flex-grow">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="relative group">
                    <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center gap-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <SortDesc size={16} />
                      <span>Sort</span>
                    </button>
                    <div className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 w-48 hidden group-hover:block">
                      <div 
                        className={`p-2 text-sm cursor-pointer rounded-md ${sortBy === 'newest' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        onClick={() => setSortBy('newest')}
                      >
                        Newest First
                      </div>
                      <div 
                        className={`p-2 text-sm cursor-pointer rounded-md ${sortBy === 'oldest' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        onClick={() => setSortBy('oldest')}
                      >
                        Oldest First
                      </div>
                      <div 
                        className={`p-2 text-sm cursor-pointer rounded-md ${sortBy === 'fee-high' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        onClick={() => setSortBy('fee-high')}
                      >
                        Fee: High to Low
                      </div>
                      <div 
                        className={`p-2 text-sm cursor-pointer rounded-md ${sortBy === 'fee-low' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        onClick={() => setSortBy('fee-low')}
                      >
                        Fee: Low to High
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeFilters.map(filter => (
                    <motion.span 
                      key={filter}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                    >
                      {filter}
                      <button 
                        onClick={() => toggleFilter(filter)}
                        className="ml-1 hover:text-primary-dark"
                      >
                        <X size={14} />
                      </button>
                    </motion.span>
                  ))}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={clearSearch}
                  >
                    Clear all filters
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Loading State */}
          {isSearching && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <Loader2 size={40} className="animate-spin text-primary mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Searching visa applications...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isSearching && filteredVisas.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-16"
            >
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                <Calendar size={32} className="text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No visa applications found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                {searchQuery || activeFilters.length > 0 
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "You haven't applied for any visas yet."}
              </p>
              <a
                href="/all-visas"
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center"
              >
                <Globe size={18} className="mr-2" />
                Browse Available Visas
              </a>
            </motion.div>
          )}

          {/* Applications List */}
          {!isSearching && filteredVisas.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "flex flex-col gap-4"
              }
            >
              <AnimatePresence>
                {filteredVisas.map((visa) => (
                  <motion.div
                    key={visa._id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'md:w-1/3' : 'h-48'}`}>
                      <img
                        src={visa.countryImage || "/placeholder.svg?height=200&width=400"}
                        alt={visa.country}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=200&width=400";
                        }}
                      />
                      <div className="absolute top-0 right-0 m-3">
                        <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                          {visa.visaType}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4">
                          <div className="flex items-center">
                            <MapPin size={16} className="text-white/80 mr-1" />
                            <h3 className="text-xl font-semibold text-white">{visa.country}</h3>
                          </div>
                          <div className="text-white/80 text-sm">
                            Applied: {visa.appliedDate}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-5 ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <User size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>
                            {visa.firstName} {visa.lastName}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Mail size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>{visa.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>Processing: {visa.processingTime}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <DollarSign size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>Fee: ${visa.fee}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <CalendarIcon size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>Applied: {visa.appliedDate}</span>
                        </div>
                        {visa.applicationMethod && (
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Send size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                            <span>Method: {visa.applicationMethod}</span>
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleCancel(visa._id)}
                        className="w-full py-2 px-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                        disabled={isLoading && deletingId === visa._id}
                      >
                        {isLoading && deletingId === visa._id ? (
                          <Loader2 size={16} className="animate-spin mr-2" />
                        ) : (
                          <Trash2 size={16} className="mr-2" />
                        )}
                        Cancel Application
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg z-50"
          >
            <ArrowUpCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default MyVisaApplication
