import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import './index.css'
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  let handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    let object = {
      email: data.email,
      password: data.password
    }

    axios({
      url: "http://localhost:8088/api/authenticate",
      method: "POST",
      data: JSON.stringify(object),
      headers: {
        'Content-Type': "application/json"
      }
    }).then((response) => {
      // console.log(response.data)
      var token = response.data.token
      var decoded = jwtDecode(token);

      Cookies.set('email', decoded.sub, {expires:1});
      Cookies.set('role', decoded.role, {expires:1});
      Cookies.set('user_id', decoded.user_id, {expires:1});
      // Cookies.set('authenticated', true, {expires:1});
        navigate("/main/home")

    }).catch((error) => {
      console.log(error)
      alert("Please check your email and password")
    })
  }
  return (
    <div id="login-container">
      <div id="login-card">
        <form id="login-form">
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <input name='email' type='text' value={data.email} onChange={handleChange} placeholder="Email" />
          </div>
          <div>
            <input name='password' type='password' value={data.password} onChange={handleChange} placeholder="Password" />
          </div>
          <div>
            <button onClick={handleSubmit} id="button">Login</button>
          </div>
          <p>Don't have an account? <a href="../register"><u>Register here</u></a></p>
        </form>
      </div>
    </div>
  )
}

export default Login;