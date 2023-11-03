import Headers from "../layout/Header"
import Footer from "../layout/Footer"
import HomePage from "./HomePage"
import CareerPage from "./CareerPage"
import TesModul from "../layout/TesModul"
import { Outlet } from "react-router-dom";

export default function MainPage(){
    return(
        <div>
            <Headers/>
            <Outlet/>
            <Footer/>
        </div>
    )
}