import { useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2'

const MyAddedVisas = () => {
  const visas = useLoaderData(); // Loaded visas data

  const HandleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    console.log("Deleting Visa with ID:", _id);

  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 bg-gray-100">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-10">
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">
            My Added Visas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visas.map((visa) => (
              <div
                key={visa.id}
                className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={visa.image}
                  alt={visa.country}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {visa.country}
                    </h3>
                    <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs">
                      {visa.visaType}
                    </span>
                  </div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li>Processing Time: {visa.processingTime}</li>
                    <li>Fee: {visa.fee}</li>
                    <li>Validity: {visa.validity} months</li>
                    <li>Application Method: {visa.applicationMethod}</li>
                  </ul>
                  <div className="flex gap-3 mt-6">
                    <button className="btn btn-primary flex-grow">Update</button>
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

      {/* Footer */}
      <footer className="text-white py-4 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MyAddedVisas;
