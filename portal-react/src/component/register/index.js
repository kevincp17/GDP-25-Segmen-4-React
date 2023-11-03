import { React } from "react";
import { useState } from "react";
import axios from "axios";
import './index.css'

function Register() {
    const [passRequirement, setPassRequirement] = useState(false);
    const [rePassRequirement, setRePassRequirement] = useState(false);
    const [showValidationMessage, setShowValidationMessage] = useState(false);

    const char = /[A-Za-z\d@$!%*?&]{8,}$/;
    const upper = /(?=.*[A-Z])/;
    const symbol = /(?=.*[@$!%*?&])/;
    const number = /(?=.*\d)/

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
        address: '',
        role: {
            role_id: 3
        }
    })

    let handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (!data.password) {
            setPassRequirement(false)
        } else {
            setPassRequirement(true)
        }

        if (!data.rePassword) {
            setRePassRequirement(false)
        } else {
            setRePassRequirement(true)
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        let object = {
            email: data.email,
            password:data.password,
            role: data.role,
            name:data.name,
            phone:data.phone,
            address:data.address
        }

        const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (data.password === data.rePassword) {
            setShowValidationMessage(false)
            console.log("password match")
            if (regex.test(data.password)) {
                setShowValidationMessage(false)
                // console.log("Password memenuhi kriteria.");
                console.log(object);
                let obj = JSON.stringify(object)
                console.log(obj)
                axios({
                    url: "http://localhost:8088/api/save",
                    method: "POST",
                    data: JSON.stringify(object),
                    headers: {
                        'Content-Type': "application/json"
                    }
                }).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })

            } else {
                setShowValidationMessage(true)
                alert("Password must contain at least 8 characters long, one uppercase letter, one number, and one special character.");
            }
        } else {
            setShowValidationMessage(true)
            alert("Password not match")
        }
    }

    return (
        <>
            <div id="container">
                <div id="card">
                    <form id="form">
                        <div>
                            <h1>Create an Account</h1>
                        </div>
                        <div>
                            <input name="name" type='text' value={data.name} onChange={handleChange} placeholder="Name" />
                        </div>
                        <div>
                            <input name="email" value={data.email} onChange={handleChange} type="text" placeholder="Email" />
                        </div>
                        <div>
                            <input name="password" value={data.password} onChange={handleChange} type="password" placeholder="Password" />
                            <div id="passReq">
                            {passRequirement && (
                                <p
                                    id='validation-message'
                                    style={{ color: char.test(data.password) ? "green" : "red", fontSize: "15px" }}
                                >
                                    {char.test(data.password) ? "minimum 8 characters" : "minimum 8 characters"}
                                </p>
                            )}
                            {passRequirement && (
                                <p
                                    id='validation-message'
                                    style={{ color: upper.test(data.password) ? "green" : "red", fontSize: "15px" }}
                                >
                                    {upper.test(data.password) ? "minimum 1 uppercase" : "minimum 1 uppercase"}
                                </p>
                            )}

                            {passRequirement && (
                                <p
                                    id='validation-message'
                                    style={{ color: symbol.test(data.password) ? "green" : "red", fontSize: "15px" }}
                                >
                                    {symbol.test(data.password) ? "minimum 1 special character" : "minimum 1 special character"}
                                </p>
                            )}

                            {passRequirement && (
                                <p
                                    id='validation-message'
                                    style={{ color: number.test(data.password) ? "green" : "red", fontSize: "15px" }}
                                >
                                    {number.test(data.password) ? "minimum 1 number" : "minimum 1 number"}
                                </p>
                            )}
                        </div>
                        </div>
                        <div>
                            <input name="rePassword" value={data.rePassword} onChange={handleChange} type="password" placeholder="Re-type Password" />
                            <div id="passReq">
                            {rePassRequirement && (
                                <p
                                    id='validation-message'
                                    style={{ color: data.password === data.rePassword ? "green" : "red", fontSize: "15px" }}
                                >
                                    {data.password === data.rePassword ? "password match" : "password not match"}
                                </p>
                            )}
                        </div>
                        </div>

                        <div>
                            <input name="phone" value={data.phone} onChange={handleChange} type="text" placeholder="Phone Number" />
                        </div>
                        <div>
                            <input name="address" value={data.address} onChange={handleChange} type="text" placeholder="Address" />
                        </div>
                        <div id="button-container">
                            <button onClick={handleSubmit} type="submit" id="button">Register</button>
                        </div>
                            <p id="text">Already have an account? <a href="/"><u>Login here</u></a></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;