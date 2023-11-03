import logo from "./logo.svg";
import "./App.css";
import MainPage from "./view/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./view/HomePage";
import CareerPage from "./view/CareerPage";
import InterviewPage from "./view/InterviewPage";
import ProfilePage from "./view/ProfilePage";
import Headers from "./layout/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<HomePage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
