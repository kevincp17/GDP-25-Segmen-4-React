import logo from './logo.svg';
import './App.css';
import Register from './component/register';
import Login from './component/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/home';
import ApplicantAuth from './auth/applicantAuth';
import InternalAuth from './auth/internalAuth';
import JobApplication from './component/jobApplication';
import TaAuth from './auth/taAuth';
import MainPage from './view/MainPage'
import HomePage from './view/HomePage';
import CareerPage from './view/CareerPage';
import InterviewPage from './view/InterviewPage';
import ProfilePage from './view/ProfilePage';
import ApplyJobPage from './view/ApplyJobPage';
import SetInterviewTAPage from './view/SetInterviewTAPage';
import SetInterviewTrainerPage from './view/SetInterviewTrainerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/home' element={<ApplicantAuth><Home/></ApplicantAuth>}/>
          <Route path='/job-application' element={<InternalAuth><JobApplication/></InternalAuth>}/> */}

        <Route index element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/main" element={<MainPage />}>
          <Route path="/main/home" element={<HomePage />} />
          <Route path="/main/careers" element={<CareerPage />} />
          <Route path="/main/interviews" element={<InterviewPage />} />
          <Route path="/main/profile" element={<ProfilePage />} />
          <Route path="/main/apply_job" element={<ApplyJobPage />} />
          <Route path="/main/set-interviewta" element={<SetInterviewTAPage />} />
          <Route path="/main/set-interviewtrainer" element={<SetInterviewTrainerPage />} />
          <Route path="/main/job-application" element={<JobApplication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;