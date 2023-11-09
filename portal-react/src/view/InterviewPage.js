import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { viewInterviews } from "../features/viewInterviewData";
import '../css/interviews.css'


export default function InterviewPage() {
    const [interview, setInterview] = useState([]);
    const url = useSelector((state) => state.interview.url)
    const dispatch = useDispatch();

    useEffect(() => {
        axios({
            url: url,
            method: "GET",
        })
            .then((response) => {
                console.log(response.data);
                setInterview(response.data.results);

                // const obj = response.data.results[0]
                // console.log(obj)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [url])


    return (
        <div className="interview-container">
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title Job</th>
                        <th>Interview Name</th>
                        <th>Date</th>
                        <th>Link</th>
                    </tr>
                </thead>

                {interview.map((data, i) => {
                    return (
                        <>
                            <tbody>
                                <tr key={data.interview_user_id}>
                                    <td>{i + 1}</td>
                                    {/* <td>{data.interview.career.title}</td> */}
                                    <td>{data.link}</td>
                                    <td>{data.interview_date}</td>
                                    <td>{data.link}</td>
                                </tr>
                            </tbody>
                        </>
                    )
                })}
            </Table>
        </div>
    )
}