import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";
import './index.css';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
// import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from "react-data-table-component";

function JobApplication() {
    const [isExpand, setExpand] = useState(false)
    const [data, setData] = useState([])
    const url = useSelector((state) => state.application.url)
    const [showToast, setShowToast] = useState(false);
    let dataApplyRow = []

    const navigate = useNavigate();

    const columns = [
        {
            name: "Job Name",
            selector: row => row.job_name,
        },
        {
            name: "Applicant Name",
            selector: row => row.applicant_name
        },
        {
            name: "Status",
            selector: row => row.status
        },
        {
            name: "Action",
            selector: row => row.action
        }
    ]

    const customStyle = {
        table: {
            style: {
                borderRadius: "10px",

            },
        }
    }

    data.map(apply => {
        const buttonStatus = apply.status.status_id >= 5 ? true : false;
        const buttonInterview = apply.status.name === 'HR Interview' || apply.status.name === 'User Interview' ? false : true;
        dataApplyRow.push({
            job_name: apply.career.title,
            applicant_name: apply.applicant.cv.name,
            status: apply.status.name,
            action: <>
                <Button ariant="primary" onClick={() => handleMakeCV(apply.applicant.user_id)}><AiOutlineFile /></Button>{' '}
                <Button variant="secondary" hidden={buttonInterview} onClick={() => handleSetInterview(apply.status.status_id, apply.career.job_id, apply.career.title, apply.applicant.cv.cv_id, apply.applicant.cv.name)}><AiOutlineLink /></Button>{' '}
                <Button variant="success" hidden={buttonStatus} onClick={() => handleAccept(apply.apply_id, apply.status.status_id)}><AiOutlineCheck /></Button>{' '}
                <Button variant="danger" hidden={buttonStatus} onClick={() => handleReject(apply.apply_id)}><AiOutlineClose /></Button></>
        })
    })

    const handleAccept = async (id, statusId) => {
        const findApplication = data.find(application => application.apply_id === id);
        if (!findApplication) {
            return null;
        }

        const finalStatus = () => {
            if (statusId < 5) {
                statusId += 1;
            }
            return statusId
        }
        const finalStatusId = finalStatus()

        const object = {
            apply_id: id,
            status: {
                status_id: finalStatusId
            }
        }
        await axios({
            url: "http://localhost:8088/api/apply/" + id,
            method: "POST",
            data: JSON.stringify(object),
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => {
            // console.log(response)
            setShowToast(true)
            show()
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleReject = async (id) => {
        const findApplication = data.find(application => application.apply_id === id);
        if (!findApplication) {
            return null;
        }

        const object = {
            apply_id: id,
            status: {
                status_id: 6
            }
        }
        await axios({
            url: "http://localhost:8088/api/apply/" + id,
            method: "POST",
            data: JSON.stringify(object),
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => {
            setShowToast(true)
            show()
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSetInterview = (id, careerId, careerName, applicantId, applicantName) => {
        localStorage.setItem("careerId", careerId)
        localStorage.setItem("careerName", careerName)
        localStorage.setItem("applicantId", applicantId)
        localStorage.setItem("applicantName", applicantName)

        if (id === 2) {
            navigate("/main/set-interviewta")
        } if (id === 3) {
            navigate("/main/set-interviewtrainer")
        }
    }

    const handleMakeCV = (id) => {
        localStorage.setItem("userId", id)
        navigate("/cv");
      };

    const show = async () => {
        await axios({
            url: url,
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => {
            setData(response.data.result)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        show()

    }, [isExpand])

    useEffect(() => {
    }, [data])

    return (
        <>
            <div id="apply-div">
                <p id="apply-title">Apply Job List</p>
                <div id="data-tb-apply">
                    <DataTable
                        className="rdt_Table"
                        columns={columns}
                        data={dataApplyRow}
                        customStyles={customStyle}
                        pagination
                        fixedHeader />
                </div>
            </div>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 0, left: 0, backgroundColor: '#ccffcc' }}>
                    <Toast.Body>Application status updated successfully</Toast.Body>
                </Toast>
        </>
    )
}
export default JobApplication;