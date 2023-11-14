import logo from "./logo.svg";
import "./App.css";
import Register from "./component/register";
import Login from "./component/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplicantAuth from "./auth/applicantAuth";
import InternalAuth from "./auth/internalAuth";
import JobApplication from "./component/jobApplication";
import TaAuth from "./auth/taAuth";

import MainPage from "./view/MainPage";
import HomePage from "./view/HomePage";
import CareerPage from "./view/CareerPage";
import InterviewPage from "./view/InterviewPage";
import ProfilePage from "./view/ProfilePage";
import Headers from "./layout/Header";
import ApplyJobPage from "./view/ApplyJobPage";
import MyDocument from "./app/handleCV";
import ControllableStates from "./app/autocomplete";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/apply_job" element={<ApplyJobPage />} />
          <Route path="/job-application" element={<JobApplication />} />
        </Route>
        <Route path="/cv" element={<MyDocument />} />
        <Route path="/autocomplete" element={<ControllableStates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
