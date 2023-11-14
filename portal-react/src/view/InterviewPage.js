import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import axios from "axios";
import { viewInterviews } from "../features/viewInterviewData";
import '../css/interviews.css'
import DataTable from "react-data-table-component";


export default function InterviewPage() {
    let dataApplyRow = []
    const [interviewList, setInterview] = useState([]);
    const url = useSelector((state) => state.interview.url)

    const columns = [
        {
            name: "Job Name",
            selector: row => row.job_name,
        },
        {
            name: "Date",
            selector: row => row.interview_date
        },
        {
            name: "Time",
            selector: row => row.interview_time
        },
        {
            name: "Link",
            selector: row => row.link
        },
    ]

    const columnsTA = [
        {
            name: "Job Name",
            selector: row => row.job_name,
        },
        {
            
            name: "Applicant Name",
            selector: row => row.applicant_name,

        },
        {
            name: "Date",
            selector: row => row.interview_date
        },
        {
            name: "Time",
            selector: row => row.interview_time
        },
        {
            name: "Link",
            selector: row => row.link
        },
    ]

    const customStyle = {
        table: {
            style: {
                borderRadius: "10px",

            },
        }
    }

    console.log(interviewList)
    interviewList.map(interview => {
        const formatTime = (time) => {
            const options = { hour: "2-digit", minute: "2-digit", hour12: false };
            return new Date(time).toLocaleTimeString(undefined, options);
        };

        localStorage.getItem("role") === "TA" || localStorage.getItem("role")==="Trainer"? 
        dataApplyRow.push({
            job_name: interview.interview?.career?.title,
            interview_date: (interview.interview_date.split("T"))[0],
            interview_time: formatTime(interview.interview_date),
            applicant_name: interview.applicant.cv.name,
            link: interview.link
        }) : 

        dataApplyRow.push({
            job_name: interview.interview?.career?.title,
            interview_date: (interview.interview_date.split("T"))[0],
            interview_time: formatTime(interview.interview_date),
            
            link: interview.link
        })
    })

    const getApplicantData = () => {
        axios({
            url: url + localStorage.getItem("userId"),
            method: "GET",
        })
            .then((response) => {
                console.log(response.data);
                setInterview(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getTAData = () => {
        axios({
            url: url,
            method: "GET",
        })
            .then((response) => {
                console.log(response.data);
                setInterview(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getTrainerData = () => {
        axios({
            url: "http://localhost:8088/api/interviewsTrainer/" + localStorage.getItem("userId"),
            method: "GET",
        })
            .then((response) => {
                console.log(response.data);
                setInterview(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if(localStorage.getItem("role") === "TA") {
            getTAData();
        } else if (localStorage.getItem("role") === "Applicant") {
            getApplicantData();
        } else if (localStorage.getItem("role") === "Trainer") {
            getTrainerData();
        }
    }, [])


    return (
        <div id="apply-div">
            <p id="apply-title">Interview List</p>
            <div id="data-tb-apply">
                <DataTable
                    className="rdt_Table"
                    columns={localStorage.getItem("role")==="TA" || localStorage.getItem("role")==="Trainer" ? columnsTA : columns}
                    data={dataApplyRow}
                    customStyles={customStyle}
                    pagination
                    fixedHeader />
            </div>
        </div>
    )
}