import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-surface-subtle dark:bg-surface-dark">
      <Navbar />
      {/* pt-24 clears the fixed Navbar */}
      <div className="pt-24">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;