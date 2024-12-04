import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MyAddedVisas = () => {
  const [visas, setVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null);

  // Fetching user's added visas (mock API call)
  useEffect(() => {
    const fetchVisas = async () => {
      // Replace this with actual API call
      const mockVisas = [
        {
          id: 1,
          country: "USA",
          image: "https://via.placeholder.com/150",
          visaType: "Tourist",
          processingTime: "15 Days",
          fee: "$150",
          validity: "6 Months",
          applicationMethod: "Online",
        },
        {
          id: 2,
          country: "Canada",
          image: "https://via.placeholder.com/150",
          visaType: "Work",
          processingTime: "30 Days",
          fee: "$200",
          validity: "1 Year",
          applicationMethod: "Offline",
        },
      ];
      setVisas(mockVisas);
    };
    fetchVisas();
  }, []);

  // Handle Delete
  const handleDelete = (id) => {
    const updatedVisas = visas.filter((visa) => visa.id !== id);
    setVisas(updatedVisas);
    console.log(`Visa with ID ${id} deleted from the database.`);
  };

  // Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedVisas = visas.map((visa) =>
      visa.id === selectedVisa.id ? { ...selectedVisa } : visa
    );
    setVisas(updatedVisas);
    setSelectedVisa(null); // Close modal
    console.log(`Visa with ID ${selectedVisa.id} updated in the database.`);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 bg-gray-100">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-10">
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            My Added Visas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
            {visas.map((visa) => (
              <div
                key={visa.id}
                className="card shadow-md rounded-lg overflow-hidden bg-white dark:bg-gray-700"
              >
                <img
                  src={visa.image}
                  alt={visa.country}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {visa.country}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Visa Type: {visa.visaType}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Processing Time: {visa.processingTime}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Fee: {visa.fee}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Validity: {visa.validity}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Application Method: {visa.applicationMethod}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => setSelectedVisa(visa)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(visa.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Updating Visa */}
          {selectedVisa && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Update Visa for {selectedVisa.country}
                </h3>
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                      Visa Type
                    </label>
                    <input
                      type="text"
                      value={selectedVisa.visaType}
                      onChange={(e) =>
                        setSelectedVisa({
                          ...selectedVisa,
                          visaType: e.target.value,
                        })
                      }
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                      Processing Time
                    </label>
                    <input
                      type="text"
                      value={selectedVisa.processingTime}
                      onChange={(e) =>
                        setSelectedVisa({
                          ...selectedVisa,
                          processingTime: e.target.value,
                        })
                      }
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                      Fee
                    </label>
                    <input
                      type="text"
                      value={selectedVisa.fee}
                      onChange={(e) =>
                        setSelectedVisa({ ...selectedVisa, fee: e.target.value })
                      }
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                      Validity
                    </label>
                    <input
                      type="text"
                      value={selectedVisa.validity}
                      onChange={(e) =>
                        setSelectedVisa({
                          ...selectedVisa,
                          validity: e.target.value,
                        })
                      }
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                      Application Method
                    </label>
                    <input
                      type="text"
                      value={selectedVisa.applicationMethod}
                      onChange={(e) =>
                        setSelectedVisa({
                          ...selectedVisa,
                          applicationMethod: e.target.value,
                        })
                      }
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setSelectedVisa(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-4 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MyAddedVisas;
