import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LatestVisas from "../components/LatestVisas";
import TopDestinations from "../components/TopDestinations";
import Testimonials from "../components/Testimonials";
import FloatingChatbot from "../components/FloatingChatbot";

const HomeLayout = () => {
  const latestVisas = [
    {
      id: 1,
      country: "Canada",
      countryImage: "canada.jpg",
      visaType: "Tourist Visa",
      processingTime: "2-4 weeks",
      fee: "$100",
      validity: "6 months",
      applicationMethod: "Online",
    },
    {
      id: 2,
      country: "USA",
      countryImage: "usa.jpg",
      visaType: "Work Visa",
      processingTime: "1-2 months",
      fee: "$160",
      validity: "1 year",
      applicationMethod: "Offline",
    },
    // Add more visa objects here...
  ];

  return (
    <div className="bg-surface-subtle dark:bg-surface-dark dark:text-white min-h-screen">
      <Navbar />

      {/* pt-24 clears the fixed Navbar so the Banner isn't hidden underneath it */}
      <div className="pt-24">
        <Banner />

        <div className="w-11/12 mx-auto">
          <LatestVisas visas={latestVisas} />
        </div>

        <div className="w-11/12 mx-auto">
          <TopDestinations />
        </div>

        <div className="w-11/12 mx-auto mb-4">
          <Testimonials />
        </div>
      </div>

      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default HomeLayout;
