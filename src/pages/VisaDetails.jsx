// /* eslint-disable no-unused-vars */
// import { useLoaderData, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useState } from "react";

// const VisaDetails = () => {
//   const Loaderddata = useLoaderData();
//   const navigate = useNavigate(); // For navigation
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [appliedDate] = useState(new Date().toLocaleDateString());
//   const [fee] = useState(Loaderddata.fee);
//   const [loading, setLoading] = useState(false);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const applicationData = {
//       email,
//       firstName,
//       lastName,
//       appliedDate,
//       fee,
//       visaId: Loaderddata._id,
//       country: Loaderddata.countryName,
//       countryImage: Loaderddata.countryImage,
//       visaType: Loaderddata.visaType,
//       processingTime: Loaderddata.processingTime,
//       validity: Loaderddata.validity,
//     };

//     // Send data to the server
//     fetch("https://visa-navigator-server-omega.vercel.app/apply-visa", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(applicationData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setLoading(false);
//         // console.log("API Response:", data); // Debug response structure
//         navigate("/");
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error("Error:", error); 
//         navigate("/");
//       });
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEmail("");
//     setFirstName("");
//     setLastName("");
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="container mx-auto p-5">
//         <h1 className="text-2xl font-bold">{Loaderddata.countryName} Visa Details</h1>
//         <div className="bg-base-100 shadow-lg p-6 mt-4">
//           <p><strong>Visa Type:</strong> {Loaderddata.visaType}</p>
//           <p><strong>Processing Time:</strong> {Loaderddata.processingTime}</p>
//           <p><strong>Fee:</strong> {Loaderddata.fee}</p>
//           <p><strong>Country:</strong> {Loaderddata.countryName}</p>
//           <p><strong>Description:</strong> {Loaderddata.description}</p>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="btn bg-yellow-400 mt-4"
//           >
//             Apply for the Visa
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h3 className="text-xl font-bold mb-4">Visa Application Form</h3>
//             <form onSubmit={handleSubmit}>
//               {/* Hidden Fields */}
//               <input type="hidden" value={Loaderddata.countryName} name="country" />
//               <input type="hidden" value={Loaderddata.countryImage} name="countryImage" />
//               <input type="hidden" value={Loaderddata.visaType} name="visaType" />
//               <input type="hidden" value={Loaderddata.processingTime} name="processingTime" />
//               <input type="hidden" value={Loaderddata.validity} name="validity" />

//               {/* Visible Fields */}
//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Your Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="input input-bordered w-full"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>

//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">First Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="input input-bordered w-full"
//                   placeholder="Enter your first name"
//                   required
//                 />
//               </div>

//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Last Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="input input-bordered w-full"
//                   placeholder="Enter your last name"
//                   required
//                 />
//               </div>

//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Applied Date</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={appliedDate}
//                   className="input input-bordered w-full"
//                   readOnly
//                 />
//               </div>

//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Fee</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={fee}
//                   className="input input-bordered w-full"
//                   readOnly
//                 />
//               </div>

//               <div className="flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="btn btn-secondary"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={`btn border-none btn-success bg-yellow-400 ${loading ? "loading" : ""}`}
//                   disabled={loading}
//                 >
//                   {loading ? "Submitting..." : "Apply"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default VisaDetails;



// "use client"

/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState } from "react"

const VisaDetails = () => {
  const Loaderddata = useLoaderData()
  const navigate = useNavigate() // For navigation
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [appliedDate] = useState(new Date().toLocaleDateString())
  const [fee] = useState(Loaderddata.fee)
  const [loading, setLoading] = useState(false)

  // Payment related states
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCVC, setCardCVC] = useState("")
  const [paymentStep, setPaymentStep] = useState(false)

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!paymentStep) {
      // Move to payment step if form is valid
      setPaymentStep(true)
      return
    }

    setLoading(true)

    const applicationData = {
      email,
      firstName,
      lastName,
      appliedDate,
      fee,
      visaId: Loaderddata._id,
      country: Loaderddata.countryName,
      countryImage: Loaderddata.countryImage,
      visaType: Loaderddata.visaType,
      processingTime: Loaderddata.processingTime,
      validity: Loaderddata.validity,
      paymentMethod,
      // Only include last 4 digits of card for security
      cardDetails: paymentMethod === "credit_card" ? `**** **** **** ${cardNumber.slice(-4)}` : null,
    }

    // Send data to the server
    fetch("https://visa-navigator-server-omega.vercel.app/apply-visa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        setLoading(false)
        // console.log("API Response:", data); // Debug response structure
        navigate("/")
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error:", error)
        navigate("/")
      })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEmail("")
    setFirstName("")
    setLastName("")
    setPaymentMethod("credit_card")
    setCardNumber("")
    setCardExpiry("")
    setCardCVC("")
    setPaymentStep(false)
  }

  const handleBackToForm = () => {
    setPaymentStep(false)
  }

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold">{Loaderddata.countryName} Visa Details</h1>
        <div className="bg-base-100 shadow-lg p-6 mt-4">
          <p>
            <strong>Visa Type:</strong> {Loaderddata.visaType}
          </p>
          <p>
            <strong>Processing Time:</strong> {Loaderddata.processingTime}
          </p>
          <p>
            <strong>Fee:</strong> {Loaderddata.fee}
          </p>
          <p>
            <strong>Country:</strong> {Loaderddata.countryName}
          </p>
          <p>
            <strong>Description:</strong> {Loaderddata.description}
          </p>
          <button onClick={() => setIsModalOpen(true)} className="btn bg-yellow-400 mt-4">
            Apply for the Visa
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{paymentStep ? "Payment Information" : "Visa Application Form"}</h3>

            <form onSubmit={handleSubmit}>
              {/* Hidden Fields */}
              <input type="hidden" value={Loaderddata.countryName} name="country" />
              <input type="hidden" value={Loaderddata.countryImage} name="countryImage" />
              <input type="hidden" value={Loaderddata.visaType} name="visaType" />
              <input type="hidden" value={Loaderddata.processingTime} name="processingTime" />
              <input type="hidden" value={Loaderddata.validity} name="validity" />

              {/* Personal Information Step */}
              {!paymentStep && (
                <>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Your Email</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Applied Date</span>
                    </label>
                    <input type="text" value={appliedDate} className="input input-bordered w-full" readOnly />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Fee</span>
                    </label>
                    <input type="text" value={fee} className="input input-bordered w-full" readOnly />
                  </div>
                </>
              )}

              {/* Payment Step */}
              {paymentStep && (
                <>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Payment Method</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="credit_card">Credit/Debit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                  </div>

                  {paymentMethod === "credit_card" && (
                    <>
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text">Card Number</span>
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          className="input input-bordered w-full"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Expiry Date</span>
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiryDate(e.target.value))}
                            className="input input-bordered w-full"
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />
                        </div>

                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">CVC</span>
                          </label>
                          <input
                            type="text"
                            value={cardCVC}
                            onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            className="input input-bordered w-full"
                            placeholder="123"
                            maxLength="3"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="bg-blue-50 p-4 rounded mb-4">
                      <p className="text-sm">
                        You will be redirected to PayPal to complete your payment after submission.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "bank_transfer" && (
                    <div className="bg-gray-50 p-4 rounded mb-4">
                      <p className="text-sm mb-2">Bank transfer details:</p>
                      <p className="text-sm">Bank: International Bank</p>
                      <p className="text-sm">Account: 1234567890</p>
                      <p className="text-sm">Reference: Please use your email as reference</p>
                    </div>
                  )}

                  <div className="bg-yellow-50 p-3 rounded mb-4">
                    <p className="text-sm font-medium">Payment Summary</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">Visa Fee:</span>
                      <span className="text-sm font-medium">{fee}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">Processing Fee:</span>
                      <span className="text-sm font-medium">$10.00</span>
                    </div>
                    <div className="border-t mt-2 pt-2 flex justify-between">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="text-sm font-medium">
                        ${Number.parseFloat(fee.replace(/[^0-9.]/g, "")) + 10.0}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={paymentStep ? handleBackToForm : handleCloseModal}
                  className="btn btn-secondary"
                >
                  {paymentStep ? "Back" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className={`btn border-none btn-success bg-yellow-400 ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Processing..." : paymentStep ? "Pay & Submit" : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default VisaDetails

