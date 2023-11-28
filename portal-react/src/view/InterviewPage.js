import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import axios from "axios";
import { viewInterviews } from "../features/viewInterviewData";
import "../css/interviews.css";
import DataTable from "react-data-table-component";
import { Button } from "@mui/material";
import { AiOutlineFile } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function InterviewPage() {
    let dataInterviewRow = [];
    const [interviewList, setInterview] = useState([]);
    const url = useSelector((state) => state.interview.url);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("role") === "TA") {
            getTAData();
        } else if (localStorage.getItem("role") === "Applicant") {
            getApplicantData();
        } else if (localStorage.getItem("role") === "Trainer") {
            getTrainerData();
        }
    }, []);

    const columns = [
        {
            name: "Job Name",
            selector: (row) => row.job_name,
        },
        {
            name: "Date",
            selector: (row) => row.interview_date,
        },
        {
            name: "Time",
            selector: (row) => row.interview_time,
        },
        {
            name: "Link",
            selector: (row) => row.link,
        },
    ];

    const columnsTA = [
        {
            name: "Job Name",
            selector: (row) => row.job_name,
        },
        {
            name: "Applicant Name",
            selector: (row) => row.applicant_name,
        },
        {
            name: "TA Name",
            selector: (row) => row.ta_name,
        },
        {
            name: "Date",
            selector: (row) => row.interview_date,
        },
        {
            name: "Time",
            selector: (row) => row.interview_time,
        },
        {
            name: "Link",
            selector: (row) => row.link,
        },
        {
            name: "Action",
            selector: (row) => row.action
        }
    ];

    const columnsTrainer = [
        {
            name: "Job Name",
            selector: (row) => row.job_name,
        },
        {
            name: "Applicant Name",
            selector: (row) => row.applicant_name,
        },
        {
            name: "Trainer Name",
            selector: (row) => row.trainer_name,
        },
        {
            name: "Date",
            selector: (row) => row.interview_date,
        },
        {
            name: "Time",
            selector: (row) => row.interview_time,
        },
        {
            name: "Link",
            selector: (row) => row.link,
        },
        {
            name: "Action",
            selector: (row) => row.action
        }
    ];

    const customStyle = {
        table: {
            style: {
                borderRadius: "10px",
            },
        },
    };

    interviewList.map((interview) => {
        const formatTime = (time) => {
            const options = { hour: "2-digit", minute: "2-digit", hour12: false };
            return new Date(time).toLocaleTimeString(undefined, options);
        };

        console.log(interview)
        localStorage.getItem("role") === "TA" ||
            localStorage.getItem("role") === "Trainer"
            ? dataInterviewRow.push({
                job_name: interview.interview?.career?.title,
                interview_date: interview.interview_date.split("T")[0],
                interview_time: formatTime(interview.interview_date),
                applicant_name: interview.applicant.cv?.name,
                ta_name: interview.ta?.cv?.name,
                trainer_name: interview.trainer?.cv?.name,
                link: interview.link,
                action: <Button
                    id="btn-cv"
                    variant="primary"
                    onClick={() => handleMakeCV(interview.applicant.user_id)}
                >
                    <AiOutlineFile />
                </Button>
            })
            : dataInterviewRow.push({
                job_name: interview.interview?.career?.title,
                interview_date: interview.interview_date.split("T")[0],
                interview_time: formatTime(interview.interview_date),

                link: interview.link,
            });
    });

    const getApplicantData = () => {
        axios({
            url: url + localStorage.getItem("userId"),
            method: "GET",
        })
            .then((response) => {
                setInterview(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getTAData = () => {
        axios({
            url: url+"ta",
            method: "GET",
        })
            .then((response) => {
                console.log(response.data.result);
                setInterview(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getTrainerData = () => {
        axios({
            url:
                "http://localhost:8088/api/interviewsTrainer/" +
                localStorage.getItem("userId"),
            method: "GET",
        })
            .then((response) => {
                console.log(response.data.result);
                setInterview(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleMakeCV = (id) => {
        localStorage.setItem("userId", id);
        navigate("/cv");
    };

    return (
        <div id="apply-div">
            <p id="apply-title">Interview List</p>
            <div id="data-tb-apply">
                <DataTable
                    className="rdt_Table"
                    columns={
                        localStorage.getItem("role") === "TA" ? columnsTA :
                        localStorage.getItem("role") === "Trainer" ? columnsTrainer :
                        columns
                    }
                    data={dataInterviewRow}
                    customStyles={customStyle}
                    pagination
                    fixedHeader
                />
            </div>
        </div>
    );
}
