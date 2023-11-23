import Headers from "../layout/Header";
import Footer from "../layout/Footer";
import HomePage from "./HomePage";
import CareerPage from "./CareerPage";
import TesModul from "../layout/TesModul";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <div
      style={
        localStorage.getItem("role") === "Admin"
          ? { display: "flex", width: "100%" }
          : null
      }
    >
      {localStorage.getItem("role") === "Admin" ? (
        <>
          <Headers />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Outlet />
            <Footer />
          </div>
        </>
      ) : (
        <>
          <Headers />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
}
