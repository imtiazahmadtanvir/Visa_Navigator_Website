import { useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useState } from "react";

const MyVisaApplication = () => {
  const Loaderdata = useLoaderData(); // Initial data from loader
  const [visas, setVisas] = useState(Loaderdata); // Manage visas state locally
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Handle visa cancellation
  const handleCancel = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/apply-visa/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your visa application has been deleted.",
                icon: "success",
              });
              setVisas(visas.filter((visa) => visa._id !== _id));
            }
          })
          .catch((error) => {
            console.error("Error deleting visa:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  // Handle search functionality
  const handleSearch = () => {
    const filteredVisas = Loaderdata.filter((visa) =>
      visa.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVisas(filteredVisas);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-4">My Visa Applications</h1>

        {/* Search Section */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by country name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>

        {visas.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visas.map((visa) => (
              <div
                key={visa._id}
                className="card bg-base-100 shadow-lg p-4 border rounded"
              >
                <img
                  src={visa.countryImage}
                  alt={visa.country}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{visa.country}</h2>
                <p><strong>Visa Type:</strong> {visa.visaType}</p>
                <p><strong>Processing Time:</strong> {visa.processingTime}</p>
                <p><strong>Fee:</strong> ${visa.fee}</p>
                <p><strong>Validity:</strong> {visa.validity}</p>
                <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
                <p><strong>Applied Date:</strong> {visa.appliedDate}</p>
                <p>
                  <strong>Applicant:</strong> {visa.firstName} {visa.lastName}
                </p>
                <p><strong>Email:</strong> {visa.email}</p>
                <button
                  onClick={() => handleCancel(visa._id)}
                  className="btn bg-red-500 text-white mt-4"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No visa applications found.</p>
        )}
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MyVisaApplication;
