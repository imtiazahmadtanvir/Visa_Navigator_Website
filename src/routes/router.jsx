import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Display/HomeLayout";
import Errorpage from "../pages/Errorpage";
import AllVisas from "../pages/AllVisas";
import AddVisa from "../pages/AddVisa";
import MyAddedVisas from "../pages/MyAddedVisas";
import MyVisaApplication from "../pages/MyVisaApplication";
import VisaDetails from "../pages/VisaDetails";
// import AuthLayout from "../layouts/AuthLayout";
import Signin from "../pages/Signin";
import AuthLayout from "../layouts/AuthLayout";


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
    element: <AddVisa></AddVisa>,
    errorElement: <Errorpage></Errorpage>,

  },
  {
    path: "/my-added-visas",
    element: <MyAddedVisas></MyAddedVisas>,
    errorElement: <Errorpage></Errorpage>,

  },
  {
    path: "/my-visa-applications",
    element: <MyVisaApplication></MyVisaApplication>,
    errorElement: <Errorpage></Errorpage>,

  },
  {
    path:"/visa-details",
    element: <VisaDetails></VisaDetails>,
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
        element: <Signin />,
        errorElement: <Errorpage></Errorpage>,
      },

    ]
  }

]);

export default router;
