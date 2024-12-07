import { useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const VisaDetails = () => {
  const Loaderddata = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState(""); // Logged-in user's email
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [appliedDate] = useState(new Date().toLocaleDateString());
  const [fee] = useState(Loaderddata.fee);

  // Handle the modal form submission
  const handleAddVisa = (event) => {
    event.preventDefault();
    const form = event.target;

    // Collect data from the form
    const countryImage = form.countryImage.value;
    const countryName = form.countryName.value;
    const visaType = form.visaType.value;
    const processingTime = form.processingTime.value;
    const validity = form.validity.value;

    // Collecting other visible form data
    const email = form.email.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const appliedDate = form.appliedDate.value;
    const fee = form.fee.value;

    const visaData = {
      countryImage,
      countryName,
      visaType,
      processingTime,
      validity,
      email,
      firstName,
      lastName,
      appliedDate,
      fee,
    };

    // Send the data to the server
    fetch("https://visa-navigator-server-6rerc8wv7-imtiazs-projects-e3424ac1.vercel.app/apply-visa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visaData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Visa application for ${visaData.countryName} submitted successfully!`,
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            setIsModalOpen(false); // Close the modal after success
            form.reset(); // Reset the form
          });
        }
      })
      .catch((error) => {
        error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to submit your visa application. Please try again.",
        });
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      {/* Modal for application form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Visa Application Form</h3>
            <form onSubmit={handleAddVisa}>
              {/* Hidden Fields */}
              <input type="hidden" name="countryImage" value={Loaderddata.countryImage} />
              <input type="hidden" name="countryName" value={Loaderddata.countryName} />
              <input type="hidden" name="visaType" value={Loaderddata.visaType} />
              <input type="hidden" name="processingTime" value={Loaderddata.processingTime} />
              <input type="hidden" name="validity" value={Loaderddata.validity} />

              {/* Visible Fields */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  name="email"
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
                  name="firstName"
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
                  name="lastName"
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
                  name="appliedDate"
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
                  name="fee"
                  value={fee}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal} // Reset form and close modal
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <Link to="/my-visa-applications" type="submit" className="btn border-none btn-success bg-yellow-400">
                  Apply
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default VisaDetails;
