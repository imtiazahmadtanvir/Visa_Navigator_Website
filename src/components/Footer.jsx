import { Link } from "react-router-dom"
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import logo from "../assets/logo.png"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-ink-100 dark:border-ink-800">
      <div className="container-page py-12">
        {/* Top Section with Logo and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo and Company Info */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-4"
            >
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Visa Navigator"
                  className="h-10 w-10 object-contain mr-3"
                  width={40}
                  height={40}
                  loading="lazy"
                />
                <span className="text-xl font-display font-bold text-ink-900 dark:text-white">Visa Navigator</span>
              </Link>
              <p className="text-ink-500 dark:text-ink-300 text-sm leading-relaxed">
                Simplifying visa processes and immigration services for travelers and businesses worldwide.
              </p>
              <div className="flex space-x-3 mt-2">
                <a
                  href="#"
                  className="p-2 rounded-full bg-ink-50 text-ink-500 dark:bg-ink-800 dark:text-ink-300 hover:bg-stamp-100 hover:text-stamp-700 dark:hover:bg-stamp-900/30 dark:hover:text-stamp-300 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-ink-50 text-ink-500 dark:bg-ink-800 dark:text-ink-300 hover:bg-stamp-100 hover:text-stamp-700 dark:hover:bg-stamp-900/30 dark:hover:text-stamp-300 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-ink-50 text-ink-500 dark:bg-ink-800 dark:text-ink-300 hover:bg-stamp-100 hover:text-stamp-700 dark:hover:bg-stamp-900/30 dark:hover:text-stamp-300 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-ink-900 dark:text-white font-display font-semibold mb-4 text-base">Company</h3>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/jobs", label: "Careers" },
                { to: "/press-kit", label: "Press Kit" },
              ].map((link) => (
                <motion.li key={link.to} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link
                    to={link.to}
                    className="text-ink-500 dark:text-ink-300 hover:text-stamp-600 dark:hover:text-stamp-300 transition-colors duration-200 flex items-center gap-1 group text-sm"
                  >
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-ink-900 dark:text-white font-display font-semibold mb-4 text-base">Services</h3>
            <ul className="space-y-3">
              {[
                { to: "/visa-services", label: "Visa Services" },
                { to: "/immigration", label: "Immigration" },
                { to: "/business-visas", label: "Business Visas" },
                { to: "/travel-insurance", label: "Travel Insurance" },
              ].map((link) => (
                <motion.li key={link.to} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link
                    to={link.to}
                    className="text-ink-500 dark:text-ink-300 hover:text-stamp-600 dark:hover:text-stamp-300 transition-colors duration-200 flex items-center gap-1 group text-sm"
                  >
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h3 className="text-ink-900 dark:text-white font-display font-semibold mb-4 text-base">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={17} className="text-stamp-500 mt-0.5 flex-shrink-0" />
                <span className="text-ink-500 dark:text-ink-300 text-sm">
                  123 Business Avenue, Suite 500
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={17} className="text-stamp-500 flex-shrink-0" />
                <a
                  href="tel:+12345678900"
                  className="text-ink-500 dark:text-ink-300 hover:text-stamp-600 dark:hover:text-stamp-300 transition-colors duration-200 text-sm"
                >
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={17} className="text-stamp-500 flex-shrink-0" />
                <a
                  href="mailto:info@visanavigator.com"
                  className="text-ink-500 dark:text-ink-300 hover:text-stamp-600 dark:hover:text-stamp-300 transition-colors duration-200 text-sm"
                >
                  info@visanavigator.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-ink-100 dark:border-ink-800 pt-8 pb-6">
          <div className="max-w-md mx-auto md:mx-0">
            <h3 className="text-ink-900 dark:text-white font-display font-semibold mb-3 text-base">
              Subscribe to our newsletter
            </h3>
            <p className="text-ink-500 dark:text-ink-300 text-sm mb-4">
              Stay updated with the latest visa requirements and travel news.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="input-field flex-1"
                required
                aria-label="Email for newsletter"
              />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary" type="submit">
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Section with Copyright and Legal Links */}
        <div className="border-t border-ink-100 dark:border-ink-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ink-400 text-sm">&copy; {currentYear} Visa Navigator Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link
              to="/privacy-policy"
              className="text-ink-400 hover:text-stamp-600 dark:hover:text-stamp-300 transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-ink-400 hover:text-stamp-600 dark:hover:text-stamp-300 transition-colors duration-200 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-ink-400 hover:text-stamp-600 dark:hover:text-stamp-300 transition-colors duration-200 text-sm"
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
