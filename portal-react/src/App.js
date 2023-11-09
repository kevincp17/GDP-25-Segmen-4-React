import logo from "./logo.svg";
import "./App.css";
import MainPage from "./view/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./view/HomePage";
import CareerPage from "./view/CareerPage";
import InterviewPage from "./view/InterviewPage";
import ProfilePage from "./view/ProfilePage";
import Headers from "./layout/Header";
import ApplyJobPage from "./view/ApplyJobPage";
import Login from "./component/login";
import Register from "./component/register";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route  path="/main" element={<MainPage />}>
          <Route path="/main/home" element={<HomePage />} />
          <Route path="/main/careers" element={<CareerPage />} />
          <Route path="/main/interviews" element={<InterviewPage />} />
          <Route path="/main/profile" element={<ProfilePage />} />
          <Route path="/main/apply_job" element={<ApplyJobPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
