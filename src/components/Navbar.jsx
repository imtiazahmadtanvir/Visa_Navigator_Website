import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar bg-base-200 dark:bg-gray-900 shadow-lg px-5 text-gray-800 dark:text-gray-200">
      {/* Left: Logo and Title */}
      <div className="flex items-center">
        <img
          src={logo} // Replace with your logo path
          alt="Visa Navigator Logo"
          className="w-10 h-10 mr-3"
        />
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Visa Navigator
        </Link>
      </div>

      {/* Middle: Links */}
      <div className="hidden md:flex gap-5 mx-auto">
        <Link
          to="/"
          className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          Home
        </Link>
        <Link
          to="/all-visas"
          className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          All Visas
        </Link>
        <Link
          to="/add-visa"
          className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          Add Visa
        </Link>
        <Link
          to="/my-added-visas"
          className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          My Added Visas
        </Link>
        <Link
          to="/my-visa-applications"
          className="btn btn-ghost normal-case hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          My Visa Applications
        </Link>
      </div>

      {/* Right: Login/Register */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          to="/login"
          className="btn btn-primary btn-sm bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="btn btn-secondary btn-sm bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          Register
        </Link>
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 dark:bg-gray-800 shadow-lg md:hidden">
          <div className="flex flex-col items-start gap-2 p-4">
            <Link
              to="/"
              className="btn btn-ghost normal-case w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/all-visas"
              className="btn btn-ghost normal-case w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              All Visas
            </Link>
            <Link
              to="/add-visa"
              className="btn btn-ghost normal-case w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Visa
            </Link>
            <Link
              to="/my-added-visas"
              className="btn btn-ghost normal-case w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              My Added Visas
            </Link>
            <Link
              to="/my-visa-applications"
              className="btn btn-ghost normal-case w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              My Visa Applications
            </Link>
            <div className="flex gap-3 w-full">
              <Link
                to="/login"
                className="btn btn-primary btn-sm w-full text-center border-none bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-secondary btn-sm w-full text-center bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
