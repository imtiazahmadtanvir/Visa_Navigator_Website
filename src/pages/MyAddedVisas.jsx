"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useLoaderData } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2"
import useCloudinary from "../hooks/cloudinary"
import {
  Edit,
  Trash2,
  X,
  Save,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Send,
  Loader2,
  Globe,
  Plus,
  Search,
  Filter,
  ImageOff,
} from "lucide-react"

const MyAddedVisas = () => {
  const initialVisas = useLoaderData()
  const [visas, setVisas] = useState(initialVisas)
  const [filteredVisas, setFilteredVisas] = useState(initialVisas)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVisa, setSelectedVisa] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)
  const [isEmpty, setIsEmpty] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const { uploadImage, uploading: isImageUploading, error: imageUploadError } = useCloudinary()
  const [newCountryImage, setNewCountryImage] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [imageRemoved, setImageRemoved] = useState(false)

  useEffect(() => {
    setIsEmpty(!visas || visas.length === 0)
  }, [visas])

  useEffect(() => {
    let result = visas

    if (searchTerm) {
      result = result.filter(
        (visa) =>
          visa.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          visa.visaType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType) {
      result = result.filter((visa) => visa.visaType === filterType)
    }

    setFilteredVisas(result)
  }, [searchTerm, filterType, visas])

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const visaTypes = useMemo(() => {
    const types = [...new Set(visas?.map((visa) => visa.visaType))]
    return types
  }, [visas])

  const handleDelete = useCallback((_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F59E0B",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark") ? "#1F2937" : "#FFFFFF",
      color: document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(_id)
        fetch(`https://visa-navigator-server-omega.vercel.app/add-visa/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            setIsDeleting(null)
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your visa has been deleted.",
                icon: "success",
                background: document.documentElement.classList.contains("dark") ? "#1F2937" : "#FFFFFF",
                color: document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000",
              })
              setVisas((prevVisas) => prevVisas.filter((visa) => visa._id !== _id))
            }
          })
          .catch((error) => {
            setIsDeleting(null)
            console.error("Error deleting visa:", error)
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
              background: document.documentElement.classList.contains("dark") ? "#1F2937" : "#FFFFFF",
              color: document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000",
            })
          })
      }
    })
  }, [])

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault()
      setIsLoading(true)

      const updatedVisa = {
        countryName: e.target.countryName.value,
        visaType: e.target.visaType.value,
        processingTime: e.target.processingTime.value,
        fee: e.target.fee.value,
        validity: e.target.validity.value,
        applicationMethod: e.target.applicationMethod.value,
        countryImage: newCountryImage,
      }

      fetch(`https://visa-navigator-server-omega.vercel.app/add-visa/${selectedVisa._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVisa),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false)
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Updated!",
              text: "Visa details updated successfully.",
              icon: "success",
              background: document.documentElement.classList.contains("dark") ? "#1F2937" : "#FFFFFF",
              color: document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000",
            })

            setVisas((prevVisas) =>
              prevVisas.map((visa) => (visa._id === selectedVisa._id ? { ...visa, ...updatedVisa } : visa)),
            )
            setIsModalOpen(false)
          }
        })
        .catch((error) => {
          setIsLoading(false)
          console.error("Error updating visa:", error)
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            background: document.documentElement.classList.contains("dark") ? "#1F2937" : "#FFFFFF",
            color: document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000",
          })
        })
    },
    [selectedVisa, newCountryImage],
  )

  const openModal = useCallback((visa) => {
    setSelectedVisa(visa)
    setNewCountryImage(visa.countryImage)
    setImagePreview(visa.countryImage)
    setImageRemoved(false)
    setIsModalOpen(true)
  }, [])

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview)
    }

    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
    setImageRemoved(false)

    const url = await uploadImage(file)
    if (url) {
      setNewCountryImage(url)
    }
  }

  const handleRemoveImage = useCallback(() => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview)
    }
    setImagePreview("")
    setNewCountryImage("")
    setImageRemoved(true)
  }, [imagePreview])

  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setFilterType("")
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  const displayImage = imageRemoved ? "" : (imagePreview || selectedVisa?.countryImage)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
              <Globe size={32} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-3 tracking-tight">My Added Visas</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Manage and update the visa listings you&apos;ve added to our platform.
            </p>
          </motion.div>

          {!isEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by country or visa type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow"
                  />
                </div>
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none transition-shadow"
                  >
                    <option value="">All Visa Types</option>
                    {visaTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {(searchTerm || filterType) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <X size={16} className="mr-2" />
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                <Globe size={40} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">No Visas Added Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                You have not added any visas yet. Start by adding your first visa to help travelers around the world.
              </p>
              <motion.a
                href="/add-visa"
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold rounded-lg transition-colors inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={18} className="mr-2" />
                Add Your First Visa
              </motion.a>
            </motion.div>
          ) : filteredVisas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                <Search size={40} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">No Matching Visas Found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                No visas match your current search criteria. Try adjusting your filters or search term.
              </p>
              <motion.button
                onClick={clearFilters}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold rounded-lg transition-colors inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} className="mr-2" />
                Clear Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredVisas.map((visa) => (
                  <motion.div
                    key={visa._id}
                    variants={itemVariants}
                    layout
                    exit="exit"
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700 flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden group">
                      <motion.img
                        src={visa.countryImage || "/placeholder.svg?height=200&width=300"}
                        alt={visa.countryName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=200&width=300"
                          e.target.onerror = null
                        }}
                      />
                      <div className="absolute top-0 right-0 m-3">
                        <span className="px-3 py-1 bg-yellow-500/90 text-gray-800 text-xs font-bold rounded-full shadow-md">
                          {visa.visaType}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-2xl font-bold text-white drop-shadow-md">{visa.countryName}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center mr-3">
                          <MapPin size={16} className="text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-tight">{visa.countryName}</h3>
                      </div>

                      <div className="space-y-2 mb-5 flex-grow">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock size={15} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm">Processing: {visa.processingTime} days</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <DollarSign size={15} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm">Fee: ${visa.fee}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Calendar size={15} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm">Validity: {visa.validity} months</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Send size={15} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm">Method: {visa.applicationMethod}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => openModal(visa)}
                          className="flex-1 min-w-[100px] py-2.5 px-2 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold rounded-lg transition-colors flex items-center justify-center text-sm"
                          disabled={isLoading || isDeleting === visa._id}
                        >
                          <Edit size={15} className="mr-1.5" />
                          Update
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleDelete(visa._id)}
                          className="flex-1 min-w-[100px] py-2.5 px-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center text-sm"
                          disabled={isLoading || isDeleting === visa._id}
                        >
                          {isDeleting === visa._id ? (
                            <Loader2 size={15} className="mr-1.5 animate-spin" />
                          ) : (
                            <Trash2 size={15} className="mr-1.5" />
                          )}
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {isModalOpen && selectedVisa && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-3 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false)
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10 rounded-t-xl">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Update Visa</h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                disabled={isLoading}
              >
                <X size={20} />
              </motion.button>
            </div>

            <form onSubmit={handleUpdate} className="p-5">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                    id="countryImageUploadEdit"
                  />
                  <div className="relative inline-block w-full">
                    <label
                      htmlFor="countryImageUploadEdit"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                    >
                      {displayImage ? (
                        <div className="relative">
                          <img
                            src={displayImage}
                            alt="Preview"
                            className="max-h-40 rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleRemoveImage()
                            }}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                            title="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Click to upload image</span>
                      )}
                    </label>
                  </div>
                  {isImageUploading && (
                    <div className="flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                      <Loader2 size={12} className="mr-1.5 animate-spin" />
                      Uploading image...
                    </div>
                  )}
                  {imageUploadError && (
                    <p className="text-xs text-red-500">{imageUploadError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country Name</label>
                  <input
                    type="text"
                    name="countryName"
                    defaultValue={selectedVisa.countryName}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Visa Type</label>
                  <select
                    name="visaType"
                    defaultValue={selectedVisa.visaType}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow"
                    required
                  >
                    <option value="">Select visa type</option>
                    <option value="Tourist visa">Tourist Visa</option>
                    <option value="Student visa">Student Visa</option>
                    <option value="Business visa">Business Visa</option>
                    <option value="Work visa">Work Visa</option>
                    <option value="Official visa">Official Visa</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Processing Time
                    </label>
                    <input
                      type="number"
                      name="processingTime"
                      defaultValue={selectedVisa.processingTime}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fee ($)</label>
                    <input
                      type="number"
                      name="fee"
                      defaultValue={selectedVisa.fee}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Validity</label>
                    <input
                      type="number"
                      name="validity"
                      defaultValue={selectedVisa.validity}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Application Method</label>
                  <input
                    type="text"
                    name="applicationMethod"
                    defaultValue={selectedVisa.applicationMethod}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="min-w-[100px] px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="min-w-[120px] px-4 py-2.5 bg-yellow-500 text-gray-800 font-semibold rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      <footer className="bottom-0 left-0 w-full z-10">
        <Footer />
      </footer>
    </div>
  )
}

export default MyAddedVisas
