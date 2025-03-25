/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider"
import { useContext } from "react"
import { motion } from "framer-motion"
import { Github, Loader2, LogIn, Mail, User, Lock, Image, UserCheck } from "lucide-react"
import axiosPublic from "../components/axiosPublic"

const Register = () => {
  const { createNewUser, setUser, createUserWithGoogle } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignUP = () => {
    setIsLoading(true)
    createUserWithGoogle()
      .then((result) => {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          role: "User",
        }
        axiosPublic
          .post("/users", userData)
          .catch(console.error)
          .finally(() => {
            setIsLoading(false)
            navigate("/") // This already navigates to home
          })
      })
      .catch((error) => {
        setIsLoading(false)
        setError((prevError) => ({
          ...prevError,
          google: "Google sign-up failed. Please try again.",
        }))
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({})
    setIsLoading(true)

    const form = new FormData(e.target)
    const name = form.get("name")
    const email = form.get("email")
    const photo = form.get("photo")
    const password = form.get("password")
    const role = form.get("role")

    if (name.length < 5) {
      setError((prevError) => ({
        ...prevError,
        name: "Name should be more than 5 characters.",
      }))
      setIsLoading(false)
      return
    }

    const passwordValidation = {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      length: password.length >= 6,
    }

    if (!passwordValidation.uppercase) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must contain at least one uppercase letter.",
      }))
      setIsLoading(false)
      return
    }
    if (!passwordValidation.lowercase) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must contain at least one lowercase letter.",
      }))
      setIsLoading(false)
      return
    }
    if (!passwordValidation.length) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must be at least 6 characters long.",
      }))
      setIsLoading(false)
      return
    }

    if (!role || role === "Select Role") {
      setError((prevError) => ({
        ...prevError,
        role: "Please select a role before creating an account.",
      }))
      setIsLoading(false)
      return
    }

    createNewUser(email, password, photo)
      .then((result) => {
        setUser(result.user)
        // Save user data to backend
        const userData = { name, email, photo, role }
        axiosPublic
          .post("/users", userData)
          .then((response) => {
            console.log(response)
            setIsLoading(false)
            // You can add a toast notification here if you have a toast system
            // toast.success("Registration successful!")
            navigate("/") // Navigate to home
          })
          .catch((error) => {
            setIsLoading(false)
            setError((prevError) => ({
              ...prevError,
              register: "Failed to save user data. Please try again.",
            }))
          })
      })
      .catch((err) => {
        setIsLoading(false)
        setError((prevError) => ({
          ...prevError,
          register: "Failed to register. Please try again.",
        }))
      })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 overflow-hidden"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Join us today and start your journey</p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-500" />
              <label className="text-sm font-medium text-gray-700">Full Name</label>
            </div>
            <div className="relative">
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
            </div>
            {error.name && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                {error.name}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4 text-indigo-500" />
              <label className="text-sm font-medium text-gray-700">Profile Photo</label>
            </div>
            <div className="relative">
              <input
                name="photo"
                type="text"
                placeholder="Enter photo URL"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-indigo-500" />
              <label className="text-sm font-medium text-gray-700">Email Address</label>
            </div>
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-500" />
              <label className="text-sm font-medium text-gray-700">Password</label>
            </div>
            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
            </div>
            {error.password && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                {error.password}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-indigo-500" />
              <label className="text-sm font-medium text-gray-700">Role</label>
            </div>
            <div className="relative">
              <select
                name="role"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none appearance-none bg-white"
                required
              >
                <option disabled value="">
                  Select Role
                </option>
                <option value="User">User</option>
              </select>
            </div>
            {error.role && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                {error.role}
              </motion.p>
            )}
          </motion.div>

          {error.register && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-4 text-center"
            >
              {error.register}
            </motion.p>
          )}

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <LogIn className="h-5 w-5 mr-2" />}
            {isLoading ? "Creating Account..." : "Register"}
          </motion.button>
        </motion.form>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8 space-y-3">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={handleGoogleSignUP}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </motion.button>

            <motion.button
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-gray-800 border border-gray-800 rounded-lg py-2.5 px-4 text-white hover:bg-gray-700 transition-all duration-200"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-5 w-5" />
              GitHub
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
          >
            Log in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Register

