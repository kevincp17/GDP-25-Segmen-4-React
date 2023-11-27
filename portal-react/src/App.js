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
import SetInterviewTAPage from "./view/SetInterviewTAPage";
import SetInterviewTrainerPage from "./view/SetInterviewTrainerPage";
import InterviewTAPage from "./view/InterviewTAPage";
import InterviewTrainerPage from "./view/InterviewTrainerPage";
import MasterSkill from "./view/MasterSkill";
import MasterMajor from "./view/MasterMajor";
import MasterInstitute from "./view/MasterInstitute";
import MasterDegree from "./view/MasterDegree";
import MasterQualification from "./view/MasterQualification";

function App() {
  console.log(localStorage.getItem("role"));
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage />}>
          <Route index path="/" element={<HomePage />}/>
          <Route path="/master_skill" element={<MasterSkill />} />
          <Route path="/master_degree" element={<MasterDegree />} />
          <Route path="/master_institute" element={<MasterInstitute />} />
          <Route path="/master_major" element={<MasterMajor />} />
          <Route path="/master_qualification" element={<MasterQualification />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/interviews/ta" element={<InterviewTAPage />} />
          <Route path="/interviews/trainer" element={<InterviewTrainerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/apply_job" element={<ApplyJobPage />} />
          <Route path="/job-application" element={<JobApplication />} />
          <Route path="/setinterview-ta" element={<SetInterviewTAPage />} />
          <Route path="/setinterview-trainer" element={<SetInterviewTrainerPage />} />
        </Route>
        <Route path="/cv" element={<MyDocument />} />
        <Route path="/autocomplete" element={<ControllableStates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
