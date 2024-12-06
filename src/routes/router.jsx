import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Display/HomeLayout";
import Errorpage from "../pages/Errorpage";
import AllVisas from "../pages/AllVisas";
import AddVisa from "../pages/AddVisa";
import MyAddedVisas from "../pages/MyAddedVisas";
import MyVisaApplication from "../pages/MyVisaApplication";
import VisaDetails from "../pages/VisaDetails";
// import AuthLayout from "../layouts/AuthLayout";
import Signin from "../Authentication/Signin";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Authentication/Register";
import ForgotPassword from "../Authentication/ForgotPassword";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>, // Layout with Navbar/Footer
    errorElement: <Errorpage></Errorpage>,
  },
  {
    path: "/all-visas",
    element: <AllVisas></AllVisas>,
    errorElement: <Errorpage></Errorpage>,

  },
  {
    path: "/add-visa",
    element:<PrivateRoute><AddVisa></AddVisa></PrivateRoute> ,
    errorElement: <Errorpage></Errorpage>,

  },
  {
    path: "/my-added-visas",
    element:<PrivateRoute><MyAddedVisas></MyAddedVisas></PrivateRoute>,
    loader:()=>fetch('http://localhost:5000/add-visa'),
    errorElement: <Errorpage></Errorpage>,

  },
  {
    path: "/my-visa-applications",
    element:<PrivateRoute> <MyVisaApplication></MyVisaApplication></PrivateRoute>,
    errorElement: <Errorpage></Errorpage>,

  },
  {
    path:"/visa-details",
    element:<PrivateRoute><VisaDetails></VisaDetails></PrivateRoute>,
    errorElement: <Errorpage></Errorpage>,

  },
  {

      path:"/profile",
      element: <Profile></Profile>,
      errorElement: <Errorpage></Errorpage>,
  
    
  },
  {
    path:"auth",
    element: <AuthLayout></AuthLayout>,
    children:[
      {
        path: "/auth/login",
        element: <Signin />,
        errorElement: <Errorpage></Errorpage>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
        errorElement: <Errorpage></Errorpage>,
      },
      {

          path: "/auth/forgot",
          element: <ForgotPassword></ForgotPassword>,
          errorElement: <Errorpage></Errorpage>,
        
      }

    ]
  }

]);

export default router;
