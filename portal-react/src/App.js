import logo from './logo.svg';
import './App.css';
import Register from './component/register';
import Login from './component/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/home';
import Auth from './auth/applicantAuth';
import ApplicantAuth from './auth/applicantAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/home' element={<ApplicantAuth><Home/></ApplicantAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;