import { Link, useLocation } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AuthContext } from "../provider/AuthProvider"
import logo from "../assets/logo.png"
import defaultPic from "../assets/defulteimage.png"
import { Menu, X, Sun, Moon, ChevronDown, LogOut, UserIcon } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logOut } = useContext(AuthContext)
  const location = useLocation()

  // Check if dark mode is enabled in localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(savedDarkMode)

    if (savedDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", String(newDarkMode))

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  // Show admin-only links for a specific email, keep applications for any logged-in user
  const isAdmin = user?.email === "admin@gmail.com"

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/all-visas", label: "All Visas" },
    ...(isAdmin
      ? [
          { path: "/add-visa", label: "Add Visa" },
          { path: "/my-added-visas", label: "My Added Visas" },
        ]
      : []),
    ...(user ? [{ path: "/my-visa-applications", label: "My Applications" }] : []),
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md shadow-soft py-2"
          : "bg-white/70 dark:bg-surface-dark/70 backdrop-blur-md py-3"
      }`}
    >
      <div className="container-page flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 8, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <img
              src={logo || "/placeholder.svg"}
              alt="Visa Navigator Logo"
              className="object-contain w-10 h-10"
              width={40}
              height={40}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-display font-bold text-ink-900 transition-colors dark:text-white group-hover:text-ink-700 dark:group-hover:text-stamp-300">
              Visa Navigator
            </span>
            <span className="hidden text-xs text-ink-400 dark:text-ink-400 sm:block">
              Your Global Visa Partner
            </span>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="items-center hidden gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive(item.path)
                  ? "text-ink-800 dark:text-stamp-300"
                  : "text-ink-500 dark:text-ink-300 hover:text-ink-800 dark:hover:text-white"
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-stamp-400 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side: User Profile/Login + Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 text-ink-600 transition-colors bg-ink-100 rounded-full dark:bg-ink-800 dark:text-ink-200 hover:bg-ink-200 dark:hover:bg-ink-700"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={18} className="text-stamp-400" /> : <Moon size={18} className="text-ink-700" />}
          </motion.button>

          {/* User Profile or Login/Register (Desktop) */}
          <div className="items-center hidden gap-2 md:flex">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
                    <img
                      src={user?.photoURL || defaultPic}
                      alt={user?.name || "User"}
                      className="object-cover w-8 h-8 border-2 border-ink-200 rounded-full dark:border-ink-700"
                      width={32}
                      height={32}
                    />
                    <ChevronDown size={16} className="text-ink-400 dark:text-ink-400" />
                  </button>

                  {/* Dropdown menu */}
                  <div className="absolute right-0 z-50 invisible w-48 mt-2 overflow-hidden transition-all duration-200 origin-top-right transform scale-95 card opacity-0 group-hover:opacity-100 group-hover:visible group-hover:scale-100">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-ink-600 transition-colors dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-800"
                      >
                        <UserIcon size={16} />
                        Profile
                      </Link>
                      <button
                        onClick={logOut}
                        className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-600 transition-colors dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth/login" className="btn-ghost">
                  Login
                </Link>
                <Link to="/auth/register" className="btn-primary !py-2">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-ink-600 transition-colors rounded-md md:hidden dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white border-t border-ink-100 md:hidden dark:bg-surface-dark dark:border-ink-800"
          >
            <div className="container-page py-3">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-stamp-50 dark:bg-stamp-900/20 text-ink-800 dark:text-stamp-300"
                        : "text-ink-600 dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile User Actions */}
              <div className="pt-4 mt-4 border-t border-ink-100 dark:border-ink-800">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <img
                        src={user?.photoURL || defaultPic}
                        alt={user?.name || "User"}
                        className="object-cover w-10 h-10 border-2 border-ink-200 rounded-full dark:border-ink-700"
                        width={40}
                        height={40}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-ink-800 dark:text-ink-200">
                          {user?.displayName || "User"}
                        </span>
                        <span className="text-xs text-ink-400">{user?.email || ""}</span>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-ink-600 transition-colors rounded-md dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-800"
                    >
                      <UserIcon size={16} />
                      View Profile
                    </Link>
                    <button
                      onClick={logOut}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 transition-colors rounded-md dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <Link to="/auth/login" className="btn-secondary justify-center">
                      Login
                    </Link>
                    <Link to="/auth/register" className="btn-primary justify-center">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
