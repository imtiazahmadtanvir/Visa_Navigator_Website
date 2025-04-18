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
    loader:()=>fetch("https://visa-navigator-server-omega.vercel.app/add-visa"),
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
    loader:()=>fetch("https://visa-navigator-server-omega.vercel.app/add-visa"),
    errorElement: <Errorpage></Errorpage>,

  },
  {
    path: "/my-visa-applications",
    element:<PrivateRoute> <MyVisaApplication></MyVisaApplication></PrivateRoute>,
    loader:()=>fetch("https://visa-navigator-server-omega.vercel.app/apply-visa"),
    errorElement: <Errorpage></Errorpage>,
  },
  {
    path: "/visa-details/:id",
    element: (
      <PrivateRoute>
        <VisaDetails></VisaDetails>
      </PrivateRoute>
    ),
    loader: ({ params }) => fetch(`https://visa-navigator-server-omega.vercel.app/add-visa/${params.id}`),
    errorElement: <Errorpage></Errorpage>,
  },
  {

      path:"/profile",
      element: <PrivateRoute><Profile></Profile></PrivateRoute>,
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
