import { Link } from "react-router-dom";
import bg1 from "../assets/bg-1.avif";
import bg2 from "../assets/bg2.avif";
import bg3 from "../assets/bg-3.avif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Typewriter } from 'react-simple-typewriter'
import { Fade } from "react-awesome-reveal";

const Banner = () => {
  return (
    <div className="w-11/12 lg:w-8/12 mx-auto">
      <section
        id="banner"
        className="p-10 text-center text-gray-900 dark:text-gray-100"
      >
        {/* Swiper Slider for Banner */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="mb-6"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="w-full h-96 relative">
              <img
                src={bg1}
                alt="Visa Process Simplified"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 flex items-center justify-center rounded-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-white px-4">
                  Simplify Your Visa Application Journey
                </h2>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="w-full h-96 relative">
              <img
                src={bg2}
                alt="Explore the World"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 flex items-center justify-center rounded-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-white px-4">
                  Explore the World Hassle-Free
                </h2>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="w-full h-96 relative">
              <img
                src={bg3}
                alt="Global Opportunities"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 flex items-center justify-center rounded-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-white px-4">
                  Access Global Opportunities Today
                </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Welcome Message */}
        <div className="max-w-3xl mx-auto">
        <div>
      <h2 className="text-4xl sm:text-3xl font-extrabold mb-4">
        Welcome to{" "}
        <span className="text-yellow-500 dark:text-yellow-400">
          Visa Navigator!
        </span>
      </h2>

      <Typewriter
        words={['Start your journey', 'Explore top destinations']}
        loop={0} // Set this to true to loop indefinitely
        cursor
        cursorStyle=""
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </div>
    
          <p className="text-xl mb-6">
            Discover a seamless way to manage and apply for visas. Your journey
            starts here!
          </p>
          <Fade>
          <p className="text-xl mb-6">
            Discover a seamless way to manage and apply for visas. Your journey
            starts here!
          </p>
          </Fade>

          {/* Start Exploring Button */}
          <Link
            to="/all-visas"
            className="btn btn-primary bg-yellow-400 text-gray-800 border-none font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 hover:shadow-md transition dark:bg-yellow-500 dark:hover:bg-yellow-600"
          >
            Explore Visas Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Banner;
