import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/login",
        element: "Login Page"
    }
])


export default router