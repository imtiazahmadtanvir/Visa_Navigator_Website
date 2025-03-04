import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { data } from "react-router-dom";
import Swal from 'sweetalert2'

const AddVisa = () => {
  const handleAddVisa = (event) => {
    event.preventDefault();
    const form = event.target;

    const countryImage = form.countryImage.value;
    const countryName = form.countryName.value;
    const visaType = form.visaType.value;
    const processingTime = form.processingTime.value;
    const requiredDocuments = Array.from(
      form.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);
    const description = form.description.value;
    const ageRestriction = form.ageRestriction.value;
    const fee = form.fee.value;
    const validity = form.validity.value;
    const applicationMethod = form.applicationMethod.value;

    // Example data submission logic (replace with your API endpoint)
    const visaData = {
      countryImage,
      countryName,
      visaType,
      processingTime,
      requiredDocuments,
      description,
      ageRestriction,
      fee,
      validity,
      applicationMethod,
    };

    console.log("Visa Data:", visaData);

    fetch('https://visa-navigator-server-omega.vercel.app/add-visa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visaData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Visa for ${visaData.countryName} added successfully!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
        

        // Swal("Visa added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add visa. Please try again.",
        });        
      });
    

    // Reset the form after submission
    form.reset();
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
            <h2 className="text-center text-2xl font-bold">Apply Visa</h2>

            <form onSubmit={handleAddVisa}>
              {/* Country Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Country Image (URL)</span>
                </label>
                <input
                  type="text"
                  name="countryImage"
                  placeholder="Enter image URL"
                  className="input input-bordered"
                  required
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
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Visa Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Visa Type</span>
                </label>
                <select name="visaType" className="select select-bordered" required>
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
                  className="input input-bordered"
                  required
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
                        name="requiredDocuments"
                        value={doc}
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
                  className="textarea textarea-bordered"
                  required
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
                  className="input input-bordered"
                  required
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
                  className="input input-bordered"
                  required
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
                  className="input input-bordered"
                  required
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
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Add Visa Button */}
              <div className="form-control mt-6">
                <button type="submit" 
            className="btn btn-primary bg-yellow-400 text-gray-800 border-none font-semibold px-10 py-3 rounded-lg hover:bg-yellow-500 hover:shadow-md transition dark:bg-yellow-500 dark:hover:bg-yellow-600"
            >
                  Apply Visa
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
