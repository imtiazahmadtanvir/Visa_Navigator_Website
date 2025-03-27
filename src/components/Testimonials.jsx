// /* eslint-disable react/no-unescaped-entities */
// const Testimonials = () => {
//     const testimonials = [
//       {
//         id: 1,
//         name: "John Doe",
//         image: "https://randomuser.me/api/portraits/men/32.jpg",
//         feedback: "The visa application process was seamless and quick. Highly recommend!",
//         country: "USA",
//       },
//       {
//         id: 2,
//         name: "Jane Smith",
//         image: "https://randomuser.me/api/portraits/women/44.jpg",
//         feedback: "Great platform with accurate information. Made my travel planning hassle-free.",
//         country: "Canada",
//       },
//       {
//         id: 3,
//         name: "Akira Tanaka",
//         image: "https://randomuser.me/api/portraits/men/77.jpg",
//         feedback: "Exceptional service! The step-by-step guidance was very helpful.",
//         country: "Japan",
//       },
//     ];
  
//     return (
//       <section className="py-12 bg-light dark:bg-gray-800 transition duration-500">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
//           What Our Users Say
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto ">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.id}
//               className="card shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-700"
//             >
//               <div className="p-6 text-center">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-20 h-20 mx-auto rounded-full border-2 border-gray-300 dark:border-gray-500"
//                 />
//                 <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
//                   {testimonial.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.country}</p>
//                 <p className="mt-3 text-gray-700 dark:text-gray-300">
//                   "{testimonial.feedback}"
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };
  
//   export default Testimonials;
  

"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle, CheckCircle } from "lucide-react"

const Testimonials = () => {
  // Enhanced testimonials data
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      feedback:
        "The visa application process was seamless and quick. The platform guided me through every step, and I received my visa approval much faster than expected. Highly recommend for anyone planning international travel!",
      country: "USA",
      rating: 5,
      date: "October 15, 2023",
      visaType: "Tourist Visa",
      verified: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      feedback:
        "Great platform with accurate information. Made my travel planning hassle-free. The document checklist feature saved me so much time, and the customer support team was incredibly helpful when I had questions.",
      country: "Canada",
      rating: 4,
      date: "September 3, 2023",
      visaType: "Work Visa",
      verified: true,
    },
    {
      id: 3,
      name: "Akira Tanaka",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
      feedback:
        "Exceptional service! The step-by-step guidance was very helpful. I was worried about applying for a student visa, but this platform made it straightforward. I'm now studying abroad thanks to their assistance!",
      country: "Japan",
      rating: 5,
      date: "November 20, 2023",
      visaType: "Student Visa",
      verified: true,
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      feedback:
        "I've used many visa services before, but this one stands out for its user-friendly interface and accurate information. The visa timeline feature helped me plan my application perfectly.",
      country: "Spain",
      rating: 5,
      date: "December 5, 2023",
      visaType: "Business Visa",
      verified: true,
    },
    {
      id: 5,
      name: "Ahmed Hassan",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      feedback:
        "The visa tracker feature is brilliant! I could see exactly where my application was in the process. Everything was transparent and the estimated processing times were spot on.",
      country: "Egypt",
      rating: 4,
      date: "January 12, 2024",
      visaType: "Family Visa",
      verified: true,
    },
  ]

  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef(null)

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, currentIndex, testimonials.length, visibleCount])

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - visibleCount + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1))
  }

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
      />
    ))
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

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
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
              <MessageCircle className="h-6 w-6 text-yellow-500" />
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">What Our Users Say</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover how we have helped thousands of travelers simplify their visa application process.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="overflow-hidden">
            <motion.div
              className="flex transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                width: `${(testimonials.length / visibleCount) * 100}%`,
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="px-3"
                  style={{ width: `${(100 / testimonials.length) * visibleCount}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="flex items-center mb-4">
                        <div className="relative">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150?text=User"
                              e.target.onerror = null
                            }}
                          />
                          {testimonial.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                              <CheckCircle size={14} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{testimonial.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <span className="mr-2">{testimonial.country}</span>•
                            <span className="ml-2">{testimonial.visaType}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex mr-2">{renderStars(testimonial.rating)}</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{testimonial.date}</span>
                      </div>

                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-yellow-200 dark:text-yellow-900/30 opacity-50" />
                        <p className="text-gray-600 dark:text-gray-300 relative z-10 pl-4">"{testimonial.feedback}"</p>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Verified Application</span>
                        {/* <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <ThumbsUp size={14} className="mr-1" />
                          <span className="text-xs">Helpful</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Start Your Visa Journey?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Join thousands of satisfied travelers who have successfully obtained their visas through our platform.
          </p>
          <motion.a
            href="/all-visas"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Explore Visa Options
            <ChevronRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials

