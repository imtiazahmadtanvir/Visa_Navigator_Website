import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider"; 
import { Link } from "react-router-dom"; 
import Footer from "../components/Footer"; 
import defaultPic from "../assets/defulteimage.png"; // Default image for user avatar
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user } = useContext(AuthContext); 

  // Ensure user data is available before rendering the profile
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Component */}
      <Navbar />

      <div className='pb-24'>
        {/* heading div */}
        <div className='bg-[#1e0e5c] pb-48'>
          <h2 data-aos="fade-down" className='text-3xl font-bold text-white pt-8 text-center'>
            Welcome {user ? user.displayName : "Loading"}
          </h2>
        </div>

        {/* details div */}
        <div className="w-11/12 mx-auto flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg -mt-32 p-8">
          <div className="avatar">
            <div className="w-40 -mt-20 rounded-full">
              {/* Use defaultPic as fallback */}
              <img 
                src={user?.photo || defaultPic} 
                alt={user?.name || "User"} 
                className="w-40 h-40 rounded-full"
              />
            </div>
          </div>
          <h3 className='text-2xl font-bold pt-4 text-center'>{user ? user.name : "Anonymous name"}</h3>
          <p className="text-sm text-gray-600 pb-4">{user ? user.email : "Anonymous email"}</p>
          <Link to="/">
            <button className="btn bg-[#1e0e5c] text-white">Back to Home</button>
          </Link>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Profile;
