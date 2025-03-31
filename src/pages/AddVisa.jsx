// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// // import { data } from "react-router-dom";
// import Swal from 'sweetalert2'

// const AddVisa = () => {
//   const handleAddVisa = (event) => {
//     event.preventDefault();
//     const form = event.target;

//     const countryImage = form.countryImage.value;
//     const countryName = form.countryName.value;
//     const visaType = form.visaType.value;
//     const processingTime = form.processingTime.value;
//     const requiredDocuments = Array.from(
//       form.querySelectorAll('input[type="checkbox"]:checked')
//     ).map((checkbox) => checkbox.value);
//     const description = form.description.value;
//     const ageRestriction = form.ageRestriction.value;
//     const fee = form.fee.value;
//     const validity = form.validity.value;
//     const applicationMethod = form.applicationMethod.value;

//     // Example data submission logic (replace with your API endpoint)
//     const visaData = {
//       countryImage,
//       countryName,
//       visaType,
//       processingTime,
//       requiredDocuments,
//       description,
//       ageRestriction,
//       fee,
//       validity,
//       applicationMethod,
//     };

//     console.log("Visa Data:", visaData);

//     fetch('https://visa-navigator-server-omega.vercel.app/add-visa', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(visaData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.insertedId) {
//           Swal.fire({
//             position: "top-center",
//             icon: "success",
//             title: `Visa for ${visaData.countryName} added successfully!`,
//             showConfirmButton: false,
//             timer: 2000,
//           });
//         }
        

//         // Swal("Visa added successfully!");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Failed to add visa. Please try again.",
//         });        
//       });
    

//     // Reset the form after submission
//     form.reset();
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-base-200">
//       {/* Navbar */}
//       <header>
//         <Navbar />
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow flex items-center justify-center p-4">
//         <div className="card w-full max-w-lg bg-base-100 shadow-lg">
//           <div className="card-body">
//             <h2 className="text-center text-2xl font-bold">Apply Visa</h2>

//             <form onSubmit={handleAddVisa}>
//               {/* Country Image */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Country Image (URL)</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="countryImage"
//                   placeholder="Enter image URL"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>

//               {/* Country Name */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Country Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="countryName"
//                   placeholder="Enter country name"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>

//               {/* Visa Type */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Visa Type</span>
//                 </label>
//                 <select name="visaType" className="select select-bordered" required>
//                   <option value="">Select visa type</option>
//                   <option value="Tourist visa">Tourist Visa</option>
//                   <option value="Student visa">Student Visa</option>
//                   <option value="Official visa">Official Visa</option>
//                 </select>
//               </div>

//               {/* Processing Time */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Processing Time</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="processingTime"
//                   placeholder="e.g., 10-15 days"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>

//               {/* Required Documents */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Required Documents</span>
//                 </label>
//                 <div className="flex flex-wrap gap-4">
//                   {[
//                     "Valid passport",
//                     "Visa application form",
//                     "Recent passport-sized photograph",
//                   ].map((doc) => (
//                     <label key={doc} className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         name="requiredDocuments"
//                         value={doc}
//                         className="checkbox checkbox-primary"
//                       />
//                       <span>{doc}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Description</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Enter description"
//                   className="textarea textarea-bordered"
//                   required
//                 ></textarea>
//               </div>

//               {/* Age Restriction */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Age Restriction</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="ageRestriction"
//                   placeholder="Enter minimum age"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>

//               {/* Fee */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Fee</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="fee"
//                   placeholder="Enter fee amount"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>

//               {/* Validity */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Validity</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="validity"
//                   placeholder="e.g., 6 months"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>

//               {/* Application Method */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Application Method</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="applicationMethod"
//                   placeholder="e.g., Online"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>

//               {/* Add Visa Button */}
//               <div className="form-control mt-6">
//                 <button type="submit" 
//             className="btn btn-primary bg-yellow-400 text-gray-800 border-none font-semibold px-10 py-3 rounded-lg hover:bg-yellow-500 hover:shadow-md transition dark:bg-yellow-500 dark:hover:bg-yellow-600"
//             >
//                   Apply Visa
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-base-300">
//         <Footer />
//       </footer>
//     </div>
//   );
// };

// export default AddVisa;


"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2"
import { ImageIcon, Globe, FileText, Clock, FileCheck, Info, Users, DollarSign, Calendar, Send, Loader2, Check, ChevronRight, ChevronLeft } from 'lucide-react'

const AddVisa = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Apply for a Visa</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete the form below to submit your visa application.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <VisaApplicationForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const VisaApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  })

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleCheckboxChange = useCallback((e) => {
    const { value, checked } = e.target
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          requiredDocuments: [...prev.requiredDocuments, value],
        }
      } else {
        return {
          ...prev,
          requiredDocuments: prev.requiredDocuments.filter((doc) => doc !== value),
        }
      }
    })
  }, [])

  const handleSubmitForm = useCallback(() => {
    setIsSubmitting(true)

    fetch("https://visa-navigator-server-omega.vercel.app/add-visa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false)
        if (data.insertedId) {
          setIsSuccess(true)
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Visa for ${formData.countryName} added successfully!`,
            showConfirmButton: false,
            timer: 2000,
          })
        }
      })
      .catch((error) => {
        setIsSubmitting(false)
        console.error("Error:", error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add visa. Please try again.",
        })
      })
  }, [formData])

  const resetForm = useCallback(() => {
    setFormData({
      countryImage: "",
      countryName: "",
      visaType: "",
      processingTime: "",
      requiredDocuments: [],
      description: "",
      ageRestriction: "",
      fee: "",
      validity: "",
      applicationMethod: "",
    })
    setCurrentStep(1)
    setIsSuccess(false)
  }, [])

  const nextStep = useCallback(() => setCurrentStep(prev => prev + 1), [])
  const prevStep = useCallback(() => setCurrentStep(prev => prev - 1), [])

  const totalSteps = 2
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
    >
      {/* Progress Steps */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6">
        <div className="flex justify-between">
          {[1, 2].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                }`}
              >
                {currentStep > step ? <Check size={20} /> : <span>{step}</span>}
              </div>
              <span className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                {step === 1 ? "Visa Details" : "Requirements"}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-600"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Basic Visa Information */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Visa Information</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                    <ImageIcon size={18} className="mr-2 text-primary" />
                    Country Image URL
                  </label>
                  <input
                    type="text"
                    name="countryImage"
                    value={formData.countryImage}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                    <Globe size={18} className="mr-2 text-primary" />
                    Country Name
                  </label>
                  <input
                    type="text"
                    name="countryName"
                    value={formData.countryName}
                    onChange={handleInputChange}
                    placeholder="Enter country name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                    <FileText size={18} className="mr-2 text-primary" />
                    Visa Type
                  </label>
                  <select
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                    <Clock size={18} className="mr-2 text-primary" />
                    Processing Time
                  </label>
                  <input
                    type="text"
                    name="processingTime"
                    value={formData.processingTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 10-15 days"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                  <Info size={18} className="mr-2 text-primary" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter visa description"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center"
              >
                Continue to Requirements
                <ChevronRight size={18} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Requirements */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Visa Requirements</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                  <FileCheck size={18} className="mr-2 text-primary" />
                  Required Documents
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {[
                    "Valid passport",
                    "Visa application form",
                    "Recent passport-sized photograph",
                    "Proof of accommodation",
                    "Travel insurance",
                    "Flight itinerary",
                    "Bank statements",
                    "Invitation letter",
                  ].map((doc) => (
                    <label key={doc} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="requiredDocuments"
                        value={doc}
                        checked={formData.requiredDocuments.includes(doc)}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-200">{doc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                    <Users size={18} className="mr-2 text-primary" />
                    Age Restriction
                  </label>
                  <input
                    type="number"
                    name="ageRestriction"
                    value={formData.ageRestriction}
                    onChange={handleInputChange}
                    placeholder="Enter minimum age"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                    <DollarSign size={18} className="mr-2 text-primary" />
                    Fee
                  </label>
                  <input
                    type="number"
                    name="fee"
                    value={formData.fee}
                    onChange={handleInputChange}
                    placeholder="Enter fee amount"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                    <Calendar size={18} className="mr-2 text-primary" />
                    Validity
                  </label>
                  <input
                    type="text"
                    name="validity"
                    value={formData.validity}
                    onChange={handleInputChange}
                    placeholder="e.g., 6 months"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                  <Send size={18} className="mr-2 text-primary" />
                  Application Method
                </label>
                <input
                  type="text"
                  name="applicationMethod"
                  value={formData.applicationMethod}
                  onChange={handleInputChange}
                  placeholder="e.g., Online, Embassy, Visa Center"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center"
                disabled={isSubmitting}
              >
                <ChevronLeft size={18} className="mr-2" />
                Back
              </motion.button>

              {!isSuccess ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitForm}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Submit Application</>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetForm}
                  className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Apply for Another Visa
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                    Application Submitted Successfully
                  </h3>
                  <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                    <p>Your visa application for {formData.countryName} has been submitted successfully.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default AddVisa
