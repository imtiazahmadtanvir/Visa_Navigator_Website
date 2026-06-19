// import { Link } from "react-router-dom";
// import { useContext, useState } from "react";
// import logo from "../assets/logo.png"; 
// import { AuthContext } from "../provider/AuthProvider";
// import defaultPic from "../assets/defulteimage.png"; 

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logOut } = useContext(AuthContext);

//   return (
//     <div className="flex items-center justify-between px-5 py-3 text-gray-800 shadow-lg bg-base-200 dark:bg-gray-900 dark:text-gray-200">
//       {/* Logo and Title */}
//       <div className="flex items-center">
//         <img src={logo} alt="Visa Navigator Logo" className="w-10 h-10 mr-3" />
//         <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Visa Navigator
//         </Link>
//       </div>

//       {/* Navigation Links (Large Devices) */}
//       <div className="hidden gap-5 lg:flex">
//         <Link to="/" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
//           Home
//         </Link>
//         <Link to="/all-visas" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
//           All Visas
//         </Link>
//         <Link to="/add-visa" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
//           Add Visa
//         </Link>
//         <Link to="/my-added-visas" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
//           My Added Visas
//         </Link>
//         <Link to="/my-visa-applications" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
//           My Visa Applications
//         </Link>
//       </div>

//       {/* User Profile or Login/Register (Large Devices) */}
//       <div className="items-center hidden gap-3 lg:flex">
//         {user ? (
//           <div className="flex items-center gap-2">
//             <Link
//               to="/profile"
//               className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700"
//             >
//               <img
//                 src={user?.photoURL || defaultPic}
//                 alt={user?.name || "User"}
//                 className="w-8 h-8 border-2 border-gray-300 rounded-full"
//               />
//             </Link>
//             <button
//               onClick={logOut}
//               className="px-4 py-2 text-gray-800 transition bg-yellow-400 rounded-lg dark:bg-yellow-500 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <>
//             <Link
//               to="/auth/login"
//               className="px-4 py-2 text-gray-800 transition bg-yellow-400 rounded-lg dark:bg-yellow-500 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600"
//             >
//               Login
//             </Link>
//             <Link
//               to="/auth/register"
//               className="px-4 py-2 text-gray-800 transition bg-yellow-400 rounded-lg dark:bg-yellow-500 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>

//       {/* Hamburger Menu for Medium/Small Devices */}
//       <div className="flex lg:hidden items-top p">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="btn btn-ghost"
//           aria-label="Toggle Menu"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
//           </svg>
//         </button>
//       </div>

//  {/* Mobile Menu Dropdown */}
// {isMenuOpen && (
//   <div className="absolute top-[4rem]  right-0  bg-base-100 dark:bg-gray-800 shadow-lg z-50">
//     <div className="flex flex-col items-start gap-2 p-4">
//       <Link
//         to="/"
//         className="w-full text-left btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700"
//       >
//         Home
//       </Link>
//       <Link
//         to="/all-visas"
//         className="w-full text-left btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700"
//       >
//         All Visas
//       </Link>
//       <Link
//         to="/add-visa"
//         className="w-full text-left btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700"
//       >
//         Add Visa
//       </Link>
//       <Link
//         to="/my-added-visas"
//         className="w-full text-left btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700"
//       >
//         My Added Visas
//       </Link>
//       <Link
//         to="/my-visa-applications"
//         className="w-full text-left btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700"
//       >
//         My Visa Applications
//       </Link>
//       {user ? (
//         <>
//           <Link
//             to="/profile"
//             className="w-full text-left btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700"
//           >
//             Profile
//           </Link>
//           <button
//             onClick={logOut}
//             className="w-full text-center bg-yellow-400 btn btn-primary dark:bg-yellow-500 hover:bg-yellow-500"
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           <Link
//             to="/auth/login"
//             className="w-full text-center bg-yellow-400 btn btn-primary hover:bg-yellow-500"
//           >
//             Login
//           </Link>
//           <Link
//             to="/auth/register"
//             className="w-full text-center bg-yellow-400 btn btn-primary hover:bg-yellow-500"
//           >
//             Register
//           </Link>
//         </>
//       )}
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default Navbar;




// "use client"

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

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle dark mode
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

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path
  }

  // Show admin-only links for a specific email, keep applications for any logged-in user
  const isAdmin = user?.email === "admin@gmail.com"

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/all-visas", label: "All Visas" },
    // Admin-only routes
    ...(isAdmin
      ? [
          { path: "/add-visa", label: "Add Visa" },
          { path: "/my-added-visas", label: "My Added Visas" },
        ]
      : []),
    // My Applications is visible to any authenticated user
    ...(user ? [{ path: "/my-visa-applications", label: "My Applications" }] : []),
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card shadow-md py-2"
          : "bg-card/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container flex items-center justify-between px-4 mx-auto">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 10, scale: 1.1 }}
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
            <span className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
              Visa Navigator
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">Your Global Visa Partner</span>
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
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
                {item.label}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
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
            className="p-2 text-foreground transition-colors bg-muted rounded-full hover:bg-border"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={18} className="text-accent-alt" /> : <Moon size={18} className="text-primary" />}
          </motion.button>

          {/* User Profile or Login/Register (Desktop) */}
          <div className="items-center hidden gap-2 md:flex">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <img
                      src={user?.photoURL || defaultPic}
                      alt={user?.name || "User"}
                      className="object-cover w-8 h-8 border-2 border-gray-200 rounded-full dark:border-gray-700"
                      width={32}
                      height={32}
                    />
                    <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
                  </button>

                  {/* Dropdown menu */}
                  <div className="absolute right-0 z-50 invisible w-48 mt-2 overflow-hidden transition-all duration-200 origin-top-right transform scale-95 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible group-hover:scale-100 border border-border">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        <UserIcon size={16} />
                        Profile
                      </Link>
                      <button
                        onClick={logOut}
                        className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-error transition-colors hover:bg-muted"
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
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-foreground transition-colors rounded-lg hover:bg-muted"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-primary rounded-lg hover:bg-primary-dark"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground transition-colors rounded-md md:hidden hover:bg-muted"
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
            className="overflow-hidden bg-card border-t border-border md:hidden"
          >
            <div className="container px-4 py-3 mx-auto">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile User Actions */}
              <div className="pt-4 mt-4 border-t border-border">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <img
                        src={user?.photoURL || defaultPic}
                        alt={user?.name || "User"}
                        className="object-cover w-10 h-10 border-2 border-border rounded-full"
                        width={40}
                        height={40}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {user?.displayName || "User"}
                        </span>
                        <span className="text-xs text-muted-foreground">{user?.email || ""}</span>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground transition-colors rounded-md hover:bg-muted"
                    >
                      <UserIcon size={16} />
                      View Profile
                    </Link>
                    <button
                      onClick={logOut}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-error transition-colors rounded-md hover:bg-muted"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <Link
                      to="/auth/login"
                      className="flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className="flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-medium bg-primary hover:bg-primary-dark text-white transition-colors"
                    >
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


