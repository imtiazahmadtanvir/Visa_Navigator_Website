/* eslint-disable react/jsx-no-duplicate-props */
"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, RefreshCw, Search } from "lucide-react"

const ErrorPage = () => {
  const [isExploding, setIsExploding] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Create particles for explosion effect
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    scale: Math.random() * 0.5 + 0.5,
    rotation: Math.random() * 360,
  }))

  useEffect(() => {
    // Check if dark mode is enabled
    const savedDarkMode = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(savedDarkMode)

    // Auto-trigger explosion animation after component mounts
    const timer = setTimeout(() => {
      setIsExploding(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const numberVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [0.8, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 0.6,
        times: [0, 0.6, 1],
        ease: "easeOut",
      },
    },
  }

  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        delay: i * 0.02,
      },
    }),
  }

  const handleTryAgain = () => {
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
    }, 100)
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-50 to-gray-100"
      } px-4`}
    >
      <motion.div
        className={`max-w-md w-full ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-xl p-8 relative overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute top-0 right-0 w-32 h-32 ${
              isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
            } rounded-full -mr-16 -mt-16`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          <motion.div
            className={`absolute bottom-0 left-0 w-24 h-24 ${
              isDarkMode ? "bg-red-900/20" : "bg-red-50"
            } rounded-full -ml-12 -mb-12`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
        </div>

        <div className="relative z-10">
          {/* Error number with explosion effect */}
          <div className="relative flex justify-center mb-8">
            <motion.div
              className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600"
              variants={numberVariants}
              initial="initial"
              animate="animate"
              onClick={() => setIsExploding(true)}
            >
              404
            </motion.div>

            {/* Explosion particles */}
            {isExploding && (
              <div className="absolute inset-0 flex items-center justify-center">
                {particles.map((particle, i) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-red-500 rounded-full"
                    custom={i / particles.length}
                    variants={particleVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      originX: "center",
                      originY: "center",
                    }}
      
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
            <motion.h1
              variants={itemVariants}
              className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"} mb-2`}
            >
              Page Not Found
            </motion.h1>

            <motion.p variants={itemVariants} className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-8`}>
              The page you are looking for has vanished into the digital void.
            </motion.p>

            {/* Search box */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for something else..."
                  className={`w-full px-4 py-3 pr-10 border ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400"
                      : "border-gray-200 bg-white text-gray-800"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search
                  className={`absolute right-3 top-3 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
                  size={20}
                />
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <motion.button
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Home size={18} />
                  Return Home
                </motion.button>
              </Link>

              <motion.button
                className={`flex items-center justify-center gap-2 ${
                  isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-200 text-gray-700"
                } border font-medium px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors w-full`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleTryAgain}
              >
                <RefreshCw size={18} />
                Try Again
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Animated illustration */}
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <svg
              width="200"
              height="120"
              viewBox="0 0 200 120"
              className={`${isDarkMode ? "text-gray-600" : "text-gray-400"}`}
            >
              <motion.path
                d="M20,100 L50,60 L80,100 L110,60 L140,100 L170,60"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.circle
                cx="50"
                cy="30"
                r="10"
                fill="#3B82F6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 1.2,
                }}
              />
              <motion.circle
                cx="150"
                cy="30"
                r="10"
                fill="#EF4444"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 1.4,
                }}
              />
              <motion.path
                d="M70,40 Q100,20 130,40"
                fill="none"
                stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Additional help text */}
      <motion.p
        className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm mt-6 max-w-md text-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        If you believe this is a mistake, please contact our support team or try refreshing the page.
      </motion.p>
    </div>
  )
}

export default ErrorPage

