import React, { useEffect } from "react"
import '../css/setinterview.css'
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SetInterviewTrainerPage() {
    const [trainer, setTrainer] = useState([{}]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        interview_date: "",
        link: "",
        status: {
            status_id: 3
        },
        interview: {
            interview_name: "Interview Trainer",
            career: {
                job_id: localStorage.getItem("careerId"),
            }
        },
        trainer: {
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
            [name]: name === "trainer" ? { user_id: value } : value,
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
        }); Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Data has been saved",
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            navigate("/job_apply")
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
                setTrainer(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUser();
    }, [])

    const filtertrainer = trainer.filter(
        (trainer) =>
            trainer.role?.role_id === 2
    );

    return (
        <div id="setinterview-container">
            <div id="setinterview-card">
                <form id="setinterview-form">
                    <div>
                        <h1>Set Interview Trainer</h1>
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
                        <select name="trainer" value={data.trainer.user_id} onChange={handleChange}>
                            <option value="" disabled>Select Trainer</option>
                            {filtertrainer.map((trainer) => {
                                return (
                                    <option key={trainer.user_id} value={trainer.user_id}>
                                        {trainer.cv.name}
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