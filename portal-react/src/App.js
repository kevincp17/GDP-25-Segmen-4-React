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

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/home' element={<ApplicantAuth><Home/></ApplicantAuth>}/>
          <Route path='/job-application' element={<InternalAuth><JobApplication/></InternalAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;