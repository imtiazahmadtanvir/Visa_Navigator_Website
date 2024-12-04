import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddVisa = () => {
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
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      requiredDocuments: checked
        ? [...prevData.requiredDocuments, value]
        : prevData.requiredDocuments.filter((doc) => doc !== value),
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="card w-full max-w-lg bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Add Visa</h2>

            <form>
              {/* Country Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Country Image (URL)</span>
                </label>
                <input
                  type="text"
                  name="countryImage"
                  placeholder="Enter image URL"
                  value={formData.countryImage}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>

              {/* Country Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Country Name</span>
                </label>
                <input
                  type="text"
                  name="countryName"
                  placeholder="Enter country name"
                  value={formData.countryName}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>

              {/* Visa Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Visa Type</span>
                </label>
                <select
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  <option value="">Select visa type</option>
                  <option value="Tourist visa">Tourist Visa</option>
                  <option value="Student visa">Student Visa</option>
                  <option value="Official visa">Official Visa</option>
                </select>
              </div>

              {/* Processing Time */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Processing Time</span>
                </label>
                <input
                  type="text"
                  name="processingTime"
                  placeholder="e.g., 10-15 days"
                  value={formData.processingTime}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>

              {/* Required Documents */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Required Documents</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    "Valid passport",
                    "Visa application form",
                    "Recent passport-sized photograph",
                  ].map((doc) => (
                    <label key={doc} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={doc}
                        checked={formData.requiredDocuments.includes(doc)}
                        onChange={handleCheckboxChange}
                        className="checkbox checkbox-primary"
                      />
                      <span>{doc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered"
                ></textarea>
              </div>

              {/* Age Restriction */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age Restriction</span>
                </label>
                <input
                  type="number"
                  name="ageRestriction"
                  placeholder="Enter minimum age"
                  value={formData.ageRestriction}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>

              {/* Fee */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fee</span>
                </label>
                <input
                  type="number"
                  name="fee"
                  placeholder="Enter fee amount"
                  value={formData.fee}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>

              {/* Validity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Validity</span>
                </label>
                <input
                  type="text"
                  name="validity"
                  placeholder="e.g., 6 months"
                  value={formData.validity}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>

              {/* Application Method */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Application Method</span>
                </label>
                <input
                  type="text"
                  name="applicationMethod"
                  placeholder="e.g., Online"
                  value={formData.applicationMethod}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>

              {/* Add Visa Button */}
              <div className="form-control mt-6">
                <button type="button" className="btn btn-primary">
                  Add Visa
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-base-300">
        <Footer />
      </footer>
    </div>
  );
};

export default AddVisa;
