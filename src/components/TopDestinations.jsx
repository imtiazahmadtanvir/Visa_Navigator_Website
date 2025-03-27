// import { Link } from "react-router-dom";
// import usa from "../assets/usa.jpg"
// import can from "../assets/Canada.jpg"
// import aus from "../assets/Australia.webp"



// const TopDestinations = () => {
//   const destinations = [
//     {
//       id: 1,
//       country: "USA",
//       image: usa,
//       stats: "10,000 Visas Approved",
//     },
//     {
//       id: 2,
//       country: "Canada",
//       image: can,
//       stats: "8,500 Visas Approved",
//     },
//     {
//       id: 3,
//       country: "Australia",
//       image: aus,
//       stats: "7,000 Visas Approved",
//     },
//   ];

//   return (
//     <section className="py-12 bg-light  dark:bg-gray-800 transition duration-500">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
//         Top Visa Destinations
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto ">
//         {destinations.map((destination) => (
//           <div key={destination.id} className="card shadow-lg rounded-lg overflow-hidden bg-white dark:bg-white">
//             <img
//               src={destination.image}
//               alt={destination.country}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4 text-center">
//               <h3 className="text-2xl font-semibold text-gray-900">
//                 {destination.country}
//               </h3>
//               <p className="text-sm text-gray-600 ">
//                 {destination.stats}
//               </p>
//               <Link
//                 to={`/all-visas?country=${destination.country}`}
//                 className="btn mt-5 btn-primary bg-yellow-500 text-gray-800 border-none font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 hover:shadow-md transition dark:bg-yellow-500  dark:hover:bg-yellow-600 w-1/2 mx-auto"
//                 >
//                 Explore Visas
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TopDestinations;



"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, Users, Award, TrendingUp, ArrowRight, Globe, Check } from "lucide-react"

// Import images
import usa from "../assets/usa.jpg"
import can from "../assets/Canada.jpg"
import aus from "../assets/Australia.webp"

const TopDestinations = () => {
  const [hoveredId, setHoveredId] = useState(null)

  // Enhanced destinations data
  const destinations = [
    {
      id: 1,
      country: "USA",
      image: usa,
      stats: "10,000+ Visas Approved",
      description: "Experience the American dream with diverse opportunities for work, study, and tourism.",
      successRate: "92%",
      processingTime: "2-4 weeks",
      flag: "🇺🇸",
      popular: ["Tourist", "Student", "Work"],
    },
    {
      id: 2,
      country: "Canada",
      image: can,
      stats: "8,500+ Visas Approved",
      description: "Discover Canada's welcoming immigration policies and high quality of life.",
      successRate: "89%",
      processingTime: "3-5 weeks",
      flag: "🇨🇦",
      popular: ["Express Entry", "Student", "Family"],
    },
    {
      id: 3,
      country: "Australia",
      image: aus,
      stats: "7,000+ Visas Approved",
      description: "Explore Australia's vibrant cities, stunning landscapes, and growing economy.",
      successRate: "85%",
      processingTime: "4-6 weeks",
      flag: "🇦🇺",
      popular: ["Skilled Worker", "Holiday", "Student"],
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/5 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <span className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Globe className="h-6 w-6 text-yellow-500" />
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Top Visa Destinations</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the most popular countries with high visa approval rates and exciting opportunities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredId(destination.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={destination.image}
                  alt={destination.country}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === destination.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <span className="text-xl mr-2">{destination.flag}</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{destination.country}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-white mb-2">
                    <Award className="h-4 w-4 mr-1 text-yellow-400" />
                    <span className="text-sm font-medium">{destination.stats}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
                    <span className="text-sm font-medium">{destination.successRate} Success Rate</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-yellow-500" />
                  {destination.country}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>

                <div className="mb-5">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Popular Visa Types:</div>
                  <div className="flex flex-wrap gap-2">
                    {destination.popular.map((type, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="text-sm">{destination.processingTime}</span>
                  </div>
                </div>

                <Link
                  to={`/all-visas?country=${destination.country}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Explore Visas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional section - Featured destination */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Need Help Choosing Your Destination?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our visa experts can help you find the perfect destination based on your qualifications, goals, and
                preferences. Get personalized recommendations and increase your chances of approval.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Get Expert Advice
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                className="relative"
              >
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400/30 to-amber-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Globe className="h-8 w-8 text-yellow-500" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-800 dark:text-white">Global Visa Success</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">25,000+ successful applications</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TopDestinations

