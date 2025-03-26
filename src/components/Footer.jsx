// "use client"

// import { Link } from "react-router-dom"
// import { Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
// import { motion } from "framer-motion"
// import { useState, useEffect } from "react"

// const Footer = () => {
//   const currentYear = new Date().getFullYear()
//   const [logoLoaded, setLogoLoaded] = useState(false)

//   // Optimize logo loading
//   useEffect(() => {
//     const img = new Image()
//     img.src = "/src/assets/logo.png"
//     img.onload = () => setLogoLoaded(true)
//   }, [])

//   return (
//     <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
//       <div className="container mx-auto px-6 py-12">
//         {/* Top Section with Logo and Navigation */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
//           {/* Logo and Company Info */}
//           <div className="md:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="flex flex-col space-y-4"
//             >
//               <Link to="/" className="flex items-center">
//                 <div className="relative h-12 w-12 mr-3 overflow-hidden">
//                   {!logoLoaded ? (
//                     <div className="h-full w-full bg-gray-200 animate-pulse rounded-md"></div>
//                   ) : (
//                     <img
//                       src="/src/assets/logo.png"
//                       alt="Visa Navigator"
//                       className="h-full w-full object-contain"
//                       width={48}
//                       height={48}
//                       loading="lazy"
//                     />
//                   )}
//                 </div>
//                 <span className="text-xl font-bold text-gray-800">Visa Navigator</span>
//               </Link>
//               <p className="text-gray-600 text-sm">
//                 Simplifying visa processes and immigration services for travelers and businesses worldwide.
//               </p>
//               <div className="flex space-x-4 mt-4">
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
//                   aria-label="Twitter"
//                 >
//                   <Twitter size={20} />
//                   <span className="sr-only">Twitter</span>
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
//                   aria-label="Facebook"
//                 >
//                   <Facebook size={20} />
//                   <span className="sr-only">Facebook</span>
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
//                   aria-label="YouTube"
//                 >
//                   <Youtube size={20} />
//                   <span className="sr-only">YouTube</span>
//                 </a>
//               </div>
//             </motion.div>
//           </div>

//           {/* Quick Links */}
//           <div className="md:col-span-1">
//             <h3 className="text-gray-800 font-semibold mb-4 text-lg">Company</h3>
//             <ul className="space-y-3">
//               <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//                 <Link
//                   to="/about"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
//                 >
//                   About Us
//                   <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </motion.li>
//               <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//                 <Link
//                   to="/contact"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
//                 >
//                   Contact
//                   <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </motion.li>
//               <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//                 <Link
//                   to="/jobs"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
//                 >
//                   Careers
//                   <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </motion.li>
//               <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//                 <Link
//                   to="/press-kit"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
//                 >
//                   Press Kit
//                   <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </motion.li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div className="md:col-span-1">
//             <h3 className="text-gray-800 font-semibold mb-4 text-lg">Services</h3>
//             <ul className="space-y-3">
//               <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//                 <Link
//                   to="/visa-services"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
//                 >
//                   Visa Services
//                   <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </motion.li>
//               <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//                 <Link
//                   to="/immigration"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
//                 >
//                   Immigration
//                   <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </motion.li>
//               <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//                 <Link
//                   to="/business-visas"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
//                 >
//                   Business Visas
//                   <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </motion.li>
//               <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
//                 <Link
//                   to="/travel-insurance"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
//                 >
//                   Travel Insurance
//                   <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </motion.li>
//             </ul>
//           </div>

//           {/* Contact Information */}
//           <div className="md:col-span-1">
//             <h3 className="text-gray-800 font-semibold mb-4 text-lg">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start">
//                 <MapPin size={18} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
//                 <span className="text-gray-600 text-sm">
//                   123 Business Avenue, Suite 500
//                   <br />
//                   New York, NY 10001
//                 </span>
//               </li>
//               <li className="flex items-center">
//                 <Phone size={18} className="text-blue-600 mr-2 flex-shrink-0" />
//                 <a
//                   href="tel:+12345678900"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
//                 >
//                   +1 (234) 567-8900
//                 </a>
//               </li>
//               <li className="flex items-center">
//                 <Mail size={18} className="text-blue-600 mr-2 flex-shrink-0" />
//                 <a
//                   href="mailto:info@visanavigator.com"
//                   className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
//                 >
//                   info@visanavigator.com
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Newsletter Subscription */}
//         <div className="border-t border-gray-200 pt-8 pb-6">
//           <div className="max-w-md mx-auto md:mx-0">
//             <h3 className="text-gray-800 font-semibold mb-3 text-lg">Subscribe to our newsletter</h3>
//             <p className="text-gray-600 text-sm mb-4">
//               Stay updated with the latest visa requirements and travel news.
//             </p>
//             <form className="flex gap-2">
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 aria-label="Email for newsletter"
//               />
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
//                 type="submit"
//               >
//                 Subscribe
//               </motion.button>
//             </form>
//           </div>
//         </div>

//         {/* Bottom Section with Copyright and Legal Links */}
//         <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-600 text-sm mb-4 md:mb-0">
//             &copy; {currentYear} Visa Navigator Ltd. All rights reserved.
//           </p>
//           <div className="flex space-x-6">
//             <Link
//               to="/privacy-policy"
//               className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
//             >
//               Privacy Policy
//             </Link>
//             <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">
//               Terms of Service
//             </Link>
//             <Link to="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">
//               Cookie Policy
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer



"use client"

import { Link } from "react-router-dom"
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [logoLoaded, setLogoLoaded] = useState(false)

  // Optimize logo loading
  useEffect(() => {
    const img = new Image()
    img.src = "/src/assets/logo.png"
    img.onload = () => setLogoLoaded(true)
  }, [])

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section with Logo and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo and Company Info */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-4"
            >
              <Link to="/" className="flex items-center">
                <div className="relative h-12 w-12 mr-3 overflow-hidden">
                  {!logoLoaded ? (
                    <div className="h-full w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
                  ) : (
                    <img 
                      src="/src/assets/logo.png" 
                      alt="Visa Navigator" 
                      className="h-full w-full object-contain"
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                  )}
                </div>
                <span className="text-xl font-bold text-gray-800 dark:text-white">Visa Navigator</span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Simplifying visa processes and immigration services for travelers and businesses worldwide.
              </p>
              <div className="flex space-x-4 mt-4">
                <a 
                  href="#" 
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a 
                  href="#" 
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a 
                  href="#" 
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-gray-800 dark:text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  About Us
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  Contact
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/jobs"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  Careers
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/press-kit"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  Press Kit
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-gray-800 dark:text-white font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/visa-services"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  Visa Services
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/immigration"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  Immigration
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/business-visas"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  Business Visas
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/travel-insurance"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  Travel Insurance
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h3 className="text-gray-800 dark:text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  123 Business Avenue, Suite 500
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                <a
                  href="tel:+12345678900"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                <a
                  href="mailto:info@visanavigator.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  info@visanavigator.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 pb-6">
          <div className="max-w-md mx-auto md:mx-0">
            <h3 className="text-gray-800 dark:text-white font-semibold mb-3 text-lg">Subscribe to our newsletter</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Stay updated with the latest visa requirements and travel news.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                required
                aria-label="Email for newsletter"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                type="submit"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Section with Copyright and Legal Links */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Visa Navigator Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy-policy"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookies" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
