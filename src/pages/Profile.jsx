import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const VisaDetails = ({ visaData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulated logged-in user data (replace with context or props)
  const loggedInUser = {
    email: "user@example.com", // Logged-in user's email
  };

  const handleApply = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const applicationData = Object.fromEntries(formData.entries());
    console.log("Application Data Submitted:", applicationData);
    setIsModalOpen(false);

    // TODO: Add logic to send data to the backend (e.g., via API).
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-gray-900">
      <nav>
        <Navbar />
      </nav>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Visa Details
        </h1>

        {/* Display Visa Details */}
        <div className="bg-base-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
          <p className="text-gray-800 dark:text-gray-100">
            <strong>Country:</strong> {visaData?.countryName || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            <strong>Visa Type:</strong> {visaData?.visaType || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            <strong>Processing Time:</strong> {visaData?.processingTime || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            <strong>Fee:</strong> ${visaData?.fee || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            <strong>Age Restriction:</strong> {visaData?.ageRestriction || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            <strong>Validity:</strong> {visaData?.validity || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            <strong>Description:</strong> {visaData?.description || "N/A"}
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            <strong>Application Method:</strong> {visaData?.applicationMethod || "N/A"}
          </p>
        </div>

        {/* Apply for Visa Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Apply for the Visa
        </button>

        {/* Application Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full sm:max-w-md shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Apply for the Visa
              </h2>
              <form onSubmit={handleApply}>
                {/* Email */}
                <div className="mb-4">
                  <label
                    className="block font-medium mb-1 text-gray-800 dark:text-gray-200"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={loggedInUser.email}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>

                {/* First Name */}
                <div className="mb-4">
                  <label
                    className="block font-medium mb-1 text-gray-800 dark:text-gray-200"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4">
                  <label
                    className="block font-medium mb-1 text-gray-800 dark:text-gray-200"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>

                {/* Applied Date */}
                <div className="mb-4">
                  <label
                    className="block font-medium mb-1 text-gray-800 dark:text-gray-200"
                    htmlFor="appliedDate"
                  >
                    Applied Date
                  </label>
                  <input
                    type="date"
                    id="appliedDate"
                    name="appliedDate"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>

                {/* Fee */}
                <div className="mb-4">
                  <label
                    className="block font-medium mb-1 text-gray-800 dark:text-gray-200"
                    htmlFor="fee"
                  >
                    Fee
                  </label>
                  <input
                    type="number"
                    id="fee"
                    name="fee"
                    defaultValue={visaData?.fee || 0}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default VisaDetails;
