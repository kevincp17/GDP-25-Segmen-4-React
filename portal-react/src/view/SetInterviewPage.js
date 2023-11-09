import React, { useEffect } from "react"
import '../css/setinterview.css'
import axios from "axios"
import { useState } from "react"

export default function SetInterviewPage() {
    const [status, setStatus] = useState([]);
    const [applicant, setApplicant] = useState([]);
    const [ta, setTa] = useState([]);
    const [trainer, setTrainer] = useState([]);
    const [interview, setInterview] = useState([]);
    const [career, setCareer] = useState([]);
    const [data, setData] = useState({
        interview_date: '',
        link: '',
        status_id: '',
        interview_id: ''
        // applicant: '',
        // ta: {
        //     ta_id: 2
        // }
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
            interview_date: data.interview_date,
            link: data.link,
            status_id: data.status_id,
            interview_id: data.interview_id
            // applicant: data.applicant,
            // ta: data.ta
        }

        axios({
            url: "http://localhost:8088/api/interviews",
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getStatusData = () => {
        axios({
            url: "http://localhost:8088/api/status",
            method: "GET",
        })
            .then((response) => {
                console.log(response.data);
                setStatus(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getInterviewData = () => {
        axios({
            url: "http://localhost:8088/api/interview",
            method: "GET",
        })
            .then((response) => {
                console.log(response.data);
                setInterview(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getStatusData();
        getInterviewData();
    }, [])

    return (
        <div id="setinterview-container">
            <div id="setinterview-card">
                <form id="setinterview-form">
                    <div>
                        <h1>Interview</h1>
                    </div>
                    <div>
                        <select name="interview_id" value={data.interview_id} onChange={handleChange}>
                            <option value="">Select Interview</option>
                            {interview.map((data) => (
                                <option key={data.interview_id} value={data.interview_id}>
                                    {data.interview_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input name='interview_date' type='text' value={data.interview_date} onChange={handleChange} placeholder="Date" />
                    </div>
                    <div>
                        <input name='link' type='text' value={data.link} onChange={handleChange} placeholder="Link" />
                    </div>
                    <div>
                        <select name="status_id" value={data.status_id} onChange={handleChange}>
                            <option value="">Select Status</option>
                            {status.map((data) => (
                                <option key={data.status_id} value={data.status_id}>
                                    {data.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* <div>
                    <input name='email' type='text' placeholder="Interview Date" />
                </div>
                <div>
                    <input name='email' type='text' placeholder="Link Interview" />
                </div> */}
                    <div id="button-container">
                        <button onClick={handleSubmit} type="submit" id="button">submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}