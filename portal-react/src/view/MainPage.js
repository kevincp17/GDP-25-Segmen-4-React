import Headers from "../layout/Header";
import Footer from "../layout/Footer";
import HomePage from "./HomePage";
import CareerPage from "./CareerPage";
import TesModul from "../layout/TesModul";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  console.log(localStorage.getItem("token")==null);
  return (
    <div
      style={
        localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "TA"|| localStorage.getItem("role") === "Trainer"
          ? { display: "flex", width: "100%" }
          : null
      }
    >
      <Headers />
      {
      localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "TA" || localStorage.getItem("role") === "Trainer" && localStorage.getItem("token")!=null ? (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Outlet />
            <Footer />
          </div>
        </>
      ) : (
        <>
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
}
