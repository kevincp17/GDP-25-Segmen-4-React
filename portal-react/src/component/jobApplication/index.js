import { GrCheckmark, GrDocumentText, GrFormCheckmark } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";
import './index.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import TableSection from "./tableSection";
import TableRow from "./tableRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from "react-data-table-component";

function JobApplication() {
    const [isExpand, setExpand] = useState(false)
    const [data, setData] = useState([])
    const url = useSelector((state) => state.application.url)
    const [showToast, setShowToast] = useState(false);
    let dataApplyRow = []
    const [hideAccept, setHideAccept] = useState(false)
    const [hideReject, setHideReject] = useState(true)
    const [hideInterview, setHideInterview] = useState(true)

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
        dataApplyRow.push({
            job_name: apply.career.title,
            applicant_name: apply.applicant.cv.name,
            status: apply.status.name,
            action: <>
                <Button ariant="primary" onClick={() => handleMakeCV(apply.applicant.user_id)}><AiOutlineFile /></Button>{' '}
                <Button variant="secondary" onClick={() => handleSetInterview(apply.status.status_id, apply.career.job_id, apply.career.title, apply.applicant.cv.cv_id, apply.applicant.cv.name)}><AiOutlineLink /></Button>{' '}
                <Button variant="success" hidden={hideAccept}><AiOutlineCheck onClick={() => handleAccept(apply.apply_id, apply.status.status_id)} /></Button>{' '}
                <Button variant="danger" onClick={() => handleReject(apply.apply_id)}><AiOutlineClose /></Button></>
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
        console.log(finalStatusId)

        const object = {
            apply_id: id,
            status: {
                status_id: finalStatusId
            }
        }
        await axios({
            url: "http://localhost:8088/api/application/" + id,
            method: "POST",
            data: JSON.stringify(object),
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => {
            console.log(response)
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
            url: "http://localhost:8088/api/application/" + id,
            method: "POST",
            data: JSON.stringify(object),
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => {
            console.log(response)
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

        console.log(applicantId)

        if (id === 2) {
            console.log("interview hr")
            navigate("/main/set-interviewta")
        } else if (id === 3) {
            console.log("interview user")
            navigate("/main/set-interviewtrainer")
        } else {
            console.log("belum bisa set interview")
        }
    }

    const handleMakeCV = (id) => {
        localStorage.setItem("userId", id)
        console.log(id)
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
                {/* <div id="input-filter">
                    <input type="text" onChange={handleFilter} placeholder="Search job appliance" />
                    <SearchIcon className="apply-search-icon" />
                </div> */}
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
            {/* <div className="container">
                <table className="table">
                    <tr>
                        <th>No</th>
                        <th>Job Position</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {data.map((application) => {
                        return (
                            <>
                                <tr key={application.apply_id} className="table-content"> */}
            {/* <td className="button-td">
                                        <button onClick={() => setExpand(!isExpand)}>
                                            {isExpand ?
                                                <MdExpandLess /> :
                                                <MdExpandMore />
                                            }
                                        </button>
                                    </td> */}
            {/* <td>{application.apply_id}</td>
                                    <td>{application.career.title}</td>
                                    <td>{application.applicant.cv.name}</td>
                                    <td>{application.status.name}</td>
                                    <td ><button hidden><AiOutlineFile /></button> 
                                    <Button variant="primary" onClick={() => handleSetInterview(application.status.status_id, application.career.job_id, application.career.title, application.applicant.cv.cv_id, application.applicant.cv.name)}><AiOutlineLink /></Button> {' '}
                                    <Button variant="success"><AiOutlineCheck onClick={() => handleAccept(application.apply_id, application.status.status_id)} /></Button> {' '}
                                    <Button variant="danger" onClick={() => handleReject(application.apply_id)}><AiOutlineClose /></Button>
                                    </td>

                                </tr>
                            </>
                        )
                    })} */}
            {/* <tr>
                        {isExpand && <TableRow />}
                    </tr> */}
            {/* </table>
                <div>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Body>Status updated successfully</Toast.Body>
                </Toast>
                </div>
            </div> */}
        </>
    )
}
export default JobApplication;