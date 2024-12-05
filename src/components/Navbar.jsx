import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import logo from "../assets/logo.png"; // Replace with your actual logo path
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop user dropdown
  const { user, logOut } = useContext(AuthContext); // Authentication context


  return (
    <div className="flex items-center justify-between bg-base-200 dark:bg-gray-900 shadow-lg px-5 py-3 text-gray-800 dark:text-gray-200">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Visa Navigator Logo" className="w-10 h-10 mr-3" />
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Visa Navigator
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-5">
        <Link to="/" className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700">
          Home
        </Link>
        <Link to="/all-visas" className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700">
          All Visas
        </Link>
        <Link to="/add-visa" className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700">
          Add Visa
        </Link>
        <Link to="/my-added-visas" className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700">
          My Added Visas
        </Link>
        <Link to="/my-visa-applications" className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700">
          My Visa Applications
        </Link>
      </div>

      {/* User Profile or Login */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={user?.photo || "https://via.placeholder.com/40"}
                alt={user?.name || "User"}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                title={user?.name || "User"}
              />

            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <Link
                  to="/"
                  onClick={logOut}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-ghost"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 dark:bg-gray-800 shadow-lg z-50">
          <div className="flex flex-col items-start gap-2 p-4">
            <Link to="/" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
              Home
            </Link>
            <Link to="/all-visas" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
              All Visas
            </Link>
            <Link to="/add-visa" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
              Add Visa
            </Link>
            <Link to="/my-added-visas" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
              My Added Visas
            </Link>
            <Link to="/my-visa-applications" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
              My Visa Applications
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <Link
                  to="/"
                  onClick={logOut}
                  className="btn btn-primary btn-sm w-full text-center bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="btn btn-primary btn-sm w-full text-center bg-yellow-400 hover:bg-yellow-500"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-primary btn-sm w-full text-center bg-yellow-400 hover:bg-yellow-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
