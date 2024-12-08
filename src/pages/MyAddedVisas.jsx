import { useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { useState } from "react";

const MyAddedVisas = () => {
  const initialVisas = useLoaderData();
  const [visas, setVisas] = useState(initialVisas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);

  const HandleDelete = (_id) => {
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
        fetch(`https://visa-navigator-server-omega.vercel.app/add-visa/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Visa has been deleted.",
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

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedVisa = {
      countryName: e.target.countryName.value,
      visaType: e.target.visaType.value,
      processingTime: e.target.processingTime.value,
      fee: e.target.fee.value,
      validity: e.target.validity.value,
      applicationMethod: e.target.applicationMethod.value,
      countryImage: e.target.countryImage.value,
    };

    fetch(`https://visa-navigator-server-omega.vercel.app/add-visa/${selectedVisa._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVisa),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Visa details updated successfully.",
            icon: "success",
          });

          setVisas(
            visas.map((visa) =>
              visa._id === selectedVisa._id ? { ...visa, ...updatedVisa } : visa
            )
          );
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error updating visa:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      });
  };

  const openModal = (visa) => {
    setSelectedVisa(visa);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 bg-gray-100 ">
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      <main className="flex-grow pt-20 pb-10">
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">
            My Added Visas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visas.map((visa) => (
              <div
                key={visa._id}
                className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={visa.countryImage}
                  alt={visa.country}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {visa.countryName}
                    </h3>
                    <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs">
                      {visa.visaType}
                    </span>
                  </div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li>Processing Time: {visa.processingTime} days</li>
                    <li>Fee: {visa.fee}</li>
                    <li>Validity: {visa.validity} months</li>
                    <li>Application Method: {visa.applicationMethod}</li>
                  </ul>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => openModal(visa)}
                      className="btn btn-primary flex-grow"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => HandleDelete(visa._id)}
                      className="btn btn-error flex-grow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Visa</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="countryImage"
                defaultValue={selectedVisa.countryImage}
                className="input input-bordered w-full mb-4"
                placeholder="Photo URL"
                required
              />

              <input
                type="text"
                name="countryName"
                defaultValue={selectedVisa.countryName}
                className="input input-bordered w-full mb-4"
                placeholder="Country Name"
                required
              />
              <input
                type="text"
                name="visaType"
                defaultValue={selectedVisa.visaType}
                className="input input-bordered w-full mb-4"
                placeholder="Visa Type"
                required
              />
              <input
                type="number"
                name="processingTime"
                defaultValue={selectedVisa.processingTime}
                className="input input-bordered w-full mb-4"
                placeholder="Processing Time"
                required
              />
              <input
                type="number"
                name="fee"
                defaultValue={selectedVisa.fee}
                className="input input-bordered w-full mb-4"
                placeholder="Fee"
                required
              />
              <input
                type="number"
                name="validity"
                defaultValue={selectedVisa.validity}
                className="input input-bordered w-full mb-4"
                placeholder="Validity"
                required
              />
              <input
                type="text"
                name="applicationMethod"
                defaultValue={selectedVisa.applicationMethod}
                className="input input-bordered w-full mb-4"
                placeholder="Application Method"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bottom-0 left-0 w-full z-50">
        <Footer />
      </footer>
    </div>
  );
};

export default MyAddedVisas;
