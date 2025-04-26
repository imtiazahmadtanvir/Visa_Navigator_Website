"use client"

/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Pagination } from "swiper/modules"
import { Typewriter } from "react-simple-typewriter"
import { Fade, Zoom, Slide } from "react-awesome-reveal"
import { ArrowRight, MapPin, Globe, Compass } from "lucide-react"

// Import images
import bg1 from "../assets/bg-1.avif"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"

// Banner slides data
const BANNER_SLIDES = [
  {
    id: 1,
    image: bg1,
    alt: "Visa Process Simplified",
    title: "Simplify Your Visa Application Journey",
    subtitle: "Streamlined processes for hassle-free travel documentation",
    icon: <MapPin className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 2,
    image: bg1,
    alt: "Explore the World",
    title: "Explore the World Hassle-Free",
    subtitle: "Your gateway to global adventures and new experiences",
    icon: <Globe className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 3,
    image: bg1,
    alt: "Global Opportunities",
    title: "Access Global Opportunities Today",
    subtitle: "Open doors to international education, business, and more",
    icon: <Compass className="w-6 h-6 text-yellow-400" />,
  },
]

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload images for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = BANNER_SLIDES.map((slide) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = slide.image
          img.crossOrigin = "anonymous"
          img.onload = resolve
        })
      })

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true)
      })
    }

    preloadImages()
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        damping: 10,
      },
    },
  }

  return (
    <div className="w-11/12 lg:w-10/12 mx-auto relative">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <section id="banner" className="py-12 px-4 md:py-16 text-center text-gray-900 dark:text-gray-100 relative">
        {/* Enhanced Swiper Slider */}
        {imagesLoaded ? (
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          >
            {BANNER_SLIDES.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="w-full h-[500px] relative overflow-hidden group">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.alt}
                    className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-105"
                    loading="eager"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 dark:from-gray-900/90 dark:via-gray-800/60 dark:to-gray-800/40 flex flex-col items-center justify-center p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl"
                      >
                        <div className="flex justify-center mb-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-sm p-3 rounded-full"
                          >
                            {slide.icon}
                          </motion.div>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{slide.title}</h2>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">{slide.subtitle}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse flex items-center justify-center mb-12">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Welcome Message with Enhanced Animations */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Welcome to{" "}
              <span className="text-yellow-500 dark:text-yellow-400 relative inline-block">
                Visa Navigator!
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400/50 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                ></motion.span>
              </span>
            </h2>

            <div className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 h-8">
              <Typewriter
                words={[
                  "Start your journey today",
                  "Explore top destinations",
                  "Simplify visa applications",
                  "Travel with confidence",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </div>
          </motion.div>

          <Fade cascade damping={0.2} triggerOnce>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Discover a seamless way to manage and apply for visas. Our platform streamlines the entire process, making
              international travel more accessible than ever before.
            </p>
          </Fade>

          <Zoom delay={300} triggerOnce>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/all-visas"
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 dark:bg-yellow-500 dark:hover:bg-yellow-600"
                >
                  Explore Visas Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/add-visa"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-700"
                >
                  Apply for a Visa
                </Link>
              </motion.div>
            </div>
          </Zoom>

          {/* Stats Section */}
          <Slide direction="up" triggerOnce delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                { count: "100+", label: "Countries" },
                { count: "10K+", label: "Successful Applications" },
                { count: "24/7", label: "Customer Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">{stat.count}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Slide>
        </motion.div>
      </section>
    </div>
  )
}

export default Banner
