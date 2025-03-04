/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const VisaDetails = () => {
  const Loaderddata = useLoaderData();
  const navigate = useNavigate(); // For navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [appliedDate] = useState(new Date().toLocaleDateString());
  const [fee] = useState(Loaderddata.fee);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

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
    };

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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        // console.log("API Response:", data); // Debug response structure
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error); 
        navigate("/");
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold">{Loaderddata.countryName} Visa Details</h1>
        <div className="bg-base-100 shadow-lg p-6 mt-4">
          <p><strong>Visa Type:</strong> {Loaderddata.visaType}</p>
          <p><strong>Processing Time:</strong> {Loaderddata.processingTime}</p>
          <p><strong>Fee:</strong> {Loaderddata.fee}</p>
          <p><strong>Country:</strong> {Loaderddata.countryName}</p>
          <p><strong>Description:</strong> {Loaderddata.description}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-yellow-400 mt-4"
          >
            Apply for the Visa
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Visa Application Form</h3>
            <form onSubmit={handleSubmit}>
              {/* Hidden Fields */}
              <input type="hidden" value={Loaderddata.countryName} name="country" />
              <input type="hidden" value={Loaderddata.countryImage} name="countryImage" />
              <input type="hidden" value={Loaderddata.visaType} name="visaType" />
              <input type="hidden" value={Loaderddata.processingTime} name="processingTime" />
              <input type="hidden" value={Loaderddata.validity} name="validity" />

              {/* Visible Fields */}
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
                <input
                  type="text"
                  value={appliedDate}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Fee</span>
                </label>
                <input
                  type="text"
                  value={fee}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn border-none btn-success bg-yellow-400 ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Apply"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default VisaDetails;
