import Footer from "../components/Footer";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 ">

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center w-11/12 mx-auto">
        <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              {/* Social Login Buttons */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <div
                  
                  className="flex items-center justify-center gap-2 w-full border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <FaGoogle className="text-xl" />
                  <span className="text-sm font-medium">Log in with Google</span>
                </div>
                <div
                  onClick={() => console.log("Login with GitHub")}
                  className="flex items-center justify-center gap-2 w-full border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <FaGithub className="text-xl" />
                  <span className="text-sm font-medium">Log in with Github</span>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link to="/auth/forgot"
                  
                  className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>

              {/* Signup Redirect */}
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link to={"/auth/register"} className="font-medium text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Signin;
