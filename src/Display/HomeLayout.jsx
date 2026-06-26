import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import TopDestinations from "../components/TopDestinations";
import Testimonials from "../components/Testimonials";
import SchedulingCTA from "../components/SchedulingCTA";
import FloatingChatbot from "../components/FloatingChatbot";

const HomeLayout = () => {
  return (
    <div className="bg-surface-subtle dark:bg-surface-dark dark:text-white min-h-screen">
      <Navbar />

      {/* pt-20 clears the fixed Navbar so content isn't hidden underneath */}
      <div className="pt-20">
        <Banner />
        <AboutSection />
        <ServicesSection />
        <TopDestinations />
        <Testimonials />
        <SchedulingCTA />
      </div>

      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default HomeLayout;
