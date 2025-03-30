// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider"; 
// import { Link } from "react-router-dom"; 
// import Footer from "../components/Footer"; 
// import defaultPic from "../assets/defulteimage.png"; // Default image for user avatar
// import Navbar from "../components/Navbar";

// const Profile = () => {
//   const { user } = useContext(AuthContext); 

//   // Ensure user data is available before rendering the profile
//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl font-semibold text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div className="flex-grow pb-16">
//         {/* Heading Section */}
//         <div className="bg-[#1e0e5c] pb-48">
//           <h2 className="text-3xl font-bold text-white pt-8 text-center">
//             Welcome {user ? user.displayName : "Loading"}
//           </h2>
//         </div>
//         {/* Details Section */}
//         <div className="w-11/12 mx-auto flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg -mt-32 p-8">
//           <div className="avatar">
//             <div className="w-40 -mt-20 rounded-full">
//               {/* Use defaultPic as fallback */}
//               <img 
//                 src={user?.photoURL || defaultPic} 
//                 alt={user?.name || "User"} 
//                 className="w-40 h-40 rounded-full"
//               />
//             </div>
//           </div>
//           <h3 className="text-2xl font-bold pt-4 text-center">
//             {user ? user.name : "Anonymous name"}
//           </h3>
//           <p className="text-sm text-gray-600 pb-4">
//             {user ? user.email : "Anonymous email"}
//           </p>
//           <Link to="/">
//             <button className="btn bg-[#1e0e5c] text-white">Back to Home</button>
//           </Link>
//         </div>
//       </div>

//       {/* Footer Fixed at Bottom */}
//       <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
//     </div>
//   );
// };

// export default Profile;


"use client"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import defaultPic from "../assets/defulteimage.png"
import Navbar from "../components/Navbar"
import { motion, AnimatePresence } from "framer-motion"
import { FaUser, FaEnvelope, FaHome, FaEdit } from "react-icons/fa"

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [showEditButton, setShowEditButton] = useState(false)

  // Simulate loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Handle image loading error
  const handleImageError = (e) => {
    e.target.src = defaultPic
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex justify-center items-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Loading your profile...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow pb-16"
          >
            {/* Heading Section with animated gradient */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 pb-48 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl  md:text-4xl font-bold text-white pt-20 mt-10 text-center"
              >
                Welcome, {user?.displayName || "Traveler"}
              </motion.h2>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-11/12 max-w-3xl mx-auto flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-3xl shadow-xl -mt-32 p-8"
            >
              <motion.div
                className="avatar relative"
                onHoverStart={() => setShowEditButton(true)}
                onHoverEnd={() => setShowEditButton(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5,
                  }}
                  className="w-40 -mt-20 rounded-full ring-4 ring-indigo-600 ring-offset-2 overflow-hidden relative"
                >
                  <img
                    src={user?.photoURL || defaultPic}
                    alt={user?.displayName || "User"}
                    className="w-40 h-40 object-cover transition-transform duration-500 hover:scale-110"
                    onError={handleImageError}
                  />
                  <AnimatePresence>
                    {showEditButton && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                      >
                        <button className="bg-white rounded-full p-2">
                          <FaEdit className="text-indigo-700 text-xl" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full max-w-md mt-10 space-y-6 "
              >
                <div className="space-y-4 ">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <FaUser className="text-indigo-600 dark:text-indigo-400 mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {user?.displayName || "Anonymous User"}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <FaEnvelope className="text-indigo-600 dark:text-indigo-400 mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {user?.email || "No email available"}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex justify-center pt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/">
                      <button className="btn bg-indigo-700 hover:bg-indigo-800 text-white flex items-center gap-2 px-6">
                        <FaHome /> Back to Home
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Activity Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-11/12 max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Recent Activity</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 dark:text-gray-300">
                        {index === 0
                          ? "Updated profile information"
                          : index === 1
                            ? "Added a new visa application"
                            : "Viewed visa details"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {index === 0 ? "2 days ago" : index === 1 ? "1 week ago" : "2 weeks ago"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Fixed at Bottom */}
      <Footer className="bottom-0 left-0 w-full z-10 bg-base-200" />
    </div>
  )
}

export default Profile

