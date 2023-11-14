import React, { useEffect } from "react"
import '../css/setinterview.css'
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SetInterviewTAPage() {
    const [ta, setTa] = useState([{}]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        interview_date: "",
        link: "",
        status: {
            status_id: 2
        },
        interview: {
            interview_name: "Interview TA",
            career: {
                job_id: localStorage.getItem("careerId"),
            }
        },
        ta: {
            user_id: ""
        },
        applicant: {
            user_id: localStorage.getItem("applicantId"),
        },

    })

    const applicantName = localStorage.getItem("applicantName")
    const careerName = localStorage.getItem("careerName")

    let handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: name === "ta" ? { user_id: value } : value,
        }));
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        console.log(JSON.stringify(data))
        axios({
            url: "http://localhost:8088/api/interviews",
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Data has been saved",
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                navigate("/main/job-application")
            }).catch((error) => {
                console.log(error);
            });
    
    }

    const getUser = () => {
        axios({
            url: "http://localhost:8088/api/user",
            method: "GET",
        })
            .then((response) => {
                console.log(response.data);
                setTa(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUser();
    }, [])

    const filterta = ta.filter(
        (ta) =>
            ta.role?.role_id === 1
    );

    return (
        <div id="setinterview-container">
            <div id="setinterview-card">
                <form id="setinterview-form">
                    <div>
                        <h1>Set Interview TA</h1>
                    </div>
                    <div>
                        <input name='interview' type='text' value={data.interview.interview_name} onChange={handleChange} disabled />
                    </div>
                    <div>
                        <input name='career' type='text' value={careerName} onChange={handleChange} disabled />
                    </div>
                    <div>
                        <input name='applicant' value={applicantName} type='text' onChange={handleChange} disabled />
                    </div>
                    <div>
                        <select name="ta" value={data.ta.user_id} onChange={handleChange}>
                            <option value="" disabled>Select TA</option>
                            {filterta.map((ta) => {
                                return (
                                    <option key={ta.user_id} value={ta.user_id}>
                                        {ta.cv.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <input name='interview_date' type='datetime-local' value={data.interview_date} onChange={handleChange} placeholder="Date" />
                    </div>
                    <div>
                        <input name='link' type='text' value={data.link} onChange={handleChange} placeholder="Link" />
                    </div>
                    <div>
                        <input name='status' type='text' value={data.status.status_id} onChange={handleChange} hidden />
                    </div>
                    <div id="button-container">
                        <button onClick={handleSubmit} type="submit" id="button">submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}