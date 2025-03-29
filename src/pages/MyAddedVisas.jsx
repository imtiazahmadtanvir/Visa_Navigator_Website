// import { useLoaderData } from "react-router-dom";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const MyAddedVisas = () => {
//   const initialVisas = useLoaderData();
//   const [visas, setVisas] = useState(initialVisas);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedVisa, setSelectedVisa] = useState(null);

//   const HandleDelete = (_id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`https://visa-navigator-server-omega.vercel.app/add-visa/${_id}`, {
//           method: "DELETE",
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.deletedCount > 0) {
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "Your Visa has been deleted.",
//                 icon: "success",
//               });
//               setVisas(visas.filter((visa) => visa._id !== _id));
//             }
//           })
//           .catch((error) => {
//             console.error("Error deleting visa:", error);
//             Swal.fire({
//               title: "Error!",
//               text: "Something went wrong. Please try again.",
//               icon: "error",
//             });
//           });
//       }
//     });
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();

//     const updatedVisa = {
//       countryName: e.target.countryName.value,
//       visaType: e.target.visaType.value,
//       processingTime: e.target.processingTime.value,
//       fee: e.target.fee.value,
//       validity: e.target.validity.value,
//       applicationMethod: e.target.applicationMethod.value,
//       countryImage: e.target.countryImage.value,
//     };

//     fetch(`https://visa-navigator-server-omega.vercel.app/add-visa/${selectedVisa._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedVisa),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.modifiedCount > 0) {
//           Swal.fire({
//             title: "Updated!",
//             text: "Visa details updated successfully.",
//             icon: "success",
//           });

//           setVisas(
//             visas.map((visa) =>
//               visa._id === selectedVisa._id ? { ...visa, ...updatedVisa } : visa
//             )
//           );
//           setIsModalOpen(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating visa:", error);
//         Swal.fire({
//           title: "Error!",
//           text: "Something went wrong. Please try again.",
//           icon: "error",
//         });
//       });
//   };

//   const openModal = (visa) => {
//     setSelectedVisa(visa);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen flex flex-col dark:bg-gray-900 bg-gray-100 ">
//       <header className="fixed top-0 left-0 right-0 z-10">
//         <Navbar />
//       </header>

//       <main className="flex-grow pt-20 pb-10">
//         <section className="py-12 container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">
//             My Added Visas
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {visas.map((visa) => (
//               <div
//                 key={visa._id}
//                 className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
//               >
//                 <img
//                   src={visa.countryImage}
//                   alt={visa.country}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                       {visa.countryName}
//                     </h3>
//                     <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs">
//                       {visa.visaType}
//                     </span>
//                   </div>
//                   <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
//                     <li>Processing Time: {visa.processingTime} days</li>
//                     <li>Fee: {visa.fee}</li>
//                     <li>Validity: {visa.validity} months</li>
//                     <li>Application Method: {visa.applicationMethod}</li>
//                   </ul>
//                   <div className="flex gap-3 mt-6">
//                     <button
//                       onClick={() => openModal(visa)}
//                       className="btn btn-primary bg-yellow-500 flex-grow hover:bg-yellow-500 text-gray-800 dark:text-gray-200 border-none"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => HandleDelete(visa._id)}
//                       className="btn btn-error flex-grow"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
//             <h3 className="text-xl font-bold mb-4">Update Visa</h3>
//             <form onSubmit={handleUpdate}>
//               <input
//                 type="text"
//                 name="countryImage"
//                 defaultValue={selectedVisa.countryImage}
//                 className="input input-bordered w-full mb-4"
//                 placeholder="Photo URL"
//                 required
//               />

//               <input
//                 type="text"
//                 name="countryName"
//                 defaultValue={selectedVisa.countryName}
//                 className="input input-bordered w-full mb-4"
//                 placeholder="Country Name"
//                 required
//               />
//               <input
//                 type="text"
//                 name="visaType"
//                 defaultValue={selectedVisa.visaType}
//                 className="input input-bordered w-full mb-4"
//                 placeholder="Visa Type"
//                 required
//               />
//               <input
//                 type="number"
//                 name="processingTime"
//                 defaultValue={selectedVisa.processingTime}
//                 className="input input-bordered w-full mb-4"
//                 placeholder="Processing Time"
//                 required
//               />
//               <input
//                 type="number"
//                 name="fee"
//                 defaultValue={selectedVisa.fee}
//                 className="input input-bordered w-full mb-4"
//                 placeholder="Fee"
//                 required
//               />
//               <input
//                 type="number"
//                 name="validity"
//                 defaultValue={selectedVisa.validity}
//                 className="input input-bordered w-full mb-4"
//                 placeholder="Validity"
//                 required
//               />
//               <input
//                 type="text"
//                 name="applicationMethod"
//                 defaultValue={selectedVisa.applicationMethod}
//                 className="input input-bordered w-full mb-4"
//                 placeholder="Application Method"
//                 required
//               />
//               <div className="flex justify-end gap-3 flex-grow w-full mx-auto">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="btn btn-secondary bg-red-600"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary text-gray-800 dark:text-gray-200 bg-yellow-500 hover:bg-yellow-500">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <footer className="bottom-0 left-0 w-full z-50">
//         <Footer />
//       </footer>
//     </div>
//   );
// };

// export default MyAddedVisas;



"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useLoaderData } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2"
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

  // Check if visas array is empty
  useEffect(() => {
    setIsEmpty(!visas || visas.length === 0)
  }, [visas])

  // Filter visas based on search term and filter type
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

  // Get unique visa types for filter dropdown
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
        countryImage: e.target.countryImage.value,
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
    [selectedVisa],
  )

  const openModal = useCallback((visa) => {
    setSelectedVisa(visa)
    setIsModalOpen(true)
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setFilterType("")
  }, [])

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">My Added Visas</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Manage the visa listings you have added to our platform.
            </p>
          </motion.div>

          {!isEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by country or visa type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none"
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
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
              <Globe size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Visas Added Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                You have not added any visas yet. Start by adding your first visa to help travelers around the world.
              </p>
              <motion.a
                href="/add-visa"
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium rounded-lg transition-colors inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={18} className="mr-2" />
                Add Your First Visa
              </motion.a>
            </motion.div>
          ) : filteredVisas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
              <Search size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Matching Visas Found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                No visas match your current search criteria. Try adjusting your filters or search term.
              </p>
              <motion.button
                onClick={clearFilters}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium rounded-lg transition-colors inline-flex items-center"
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
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative h-48 overflow-hidden group">
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
                        <span className="px-3 py-1 bg-yellow-500/90 text-gray-800 text-xs font-medium rounded-full">
                          {visa.visaType}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4">
                          <h3 className="text-xl font-bold text-white">{visa.countryName}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <MapPin size={18} className="text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{visa.countryName}</h3>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>Processing: {visa.processingTime} days</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <DollarSign size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>Fee: ${visa.fee}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Calendar size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>Validity: {visa.validity} months</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Send size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                          <span>Method: {visa.applicationMethod}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => openModal(visa)}
                          className="flex-1 py-2 px-3 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium rounded-lg transition-colors flex items-center justify-center"
                          disabled={isLoading || isDeleting === visa._id}
                        >
                          <Edit size={16} className="mr-2" />
                          Update
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleDelete(visa._id)}
                          className="flex-1 py-2 px-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                          disabled={isLoading || isDeleting === visa._id}
                        >
                          {isDeleting === visa._id ? (
                            <Loader2 size={16} className="mr-2 animate-spin" />
                          ) : (
                            <Trash2 size={16} className="mr-2" />
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

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && selectedVisa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
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
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country Image URL</label>
                    <input
                      type="text"
                      name="countryImage"
                      defaultValue={selectedVisa.countryImage}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country Name</label>
                    <input
                      type="text"
                      name="countryName"
                      defaultValue={selectedVisa.countryName}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Visa Type</label>
                    <select
                      name="visaType"
                      defaultValue={selectedVisa.visaType}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Processing Time (days)
                    </label>
                    <input
                      type="number"
                      name="processingTime"
                      defaultValue={selectedVisa.processingTime}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fee ($)</label>
                    <input
                      type="number"
                      name="fee"
                      defaultValue={selectedVisa.fee}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Validity (months)</label>
                    <input
                      type="number"
                      name="validity"
                      defaultValue={selectedVisa.validity}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Application Method</label>
                    <input
                      type="text"
                      name="applicationMethod"
                      defaultValue={selectedVisa.applicationMethod}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-gray-800 font-medium rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
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
      </AnimatePresence>

      <footer className="bottom-0 left-0 w-full z-10">
        <Footer />
      </footer>
    </div>
  )
}

export default MyAddedVisas

