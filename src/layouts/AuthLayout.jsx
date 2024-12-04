import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";



const AuthLayout = () => {
    return (
        <div>
            <div className=" bg-gray-800">
                <div className=" w-full">
                <Navbar></Navbar>
                </div>
                <Outlet></Outlet>
                


            </div>
        </div>
    );
};

export default AuthLayout;