import { GrCheckmark, GrDocumentText, GrFormCheckmark } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";
import './index.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import TableSection from "./tableSection";
import TableRow from "./tableRow";
import axios from "axios";

function JobApplication() {
    const [isExpand, setExpand] = useState(false)
    const [data, setData] = useState([])
    const url = useSelector((state) => state.application.url)

    const handleAccept = async (id, statusId) => {
        const findApplication = data.find(application => application.apply_id === id);
        if (!findApplication) {
            return null;
        }
    
    const finalStatus = () => {
        if(statusId < 5){
            statusId+=1;
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
            show()
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSetInterview = (id) => {
        if(id === 2){
            console.log("interview hr")
        } else if(id === 3){
            console.log("interview user")
        } else {
            console.log("belum bisa set interview")
        }
    }

    const show = async () => {
        await axios({
            url: url,
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => {
            setData(response.data.results)
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
            <div className="container">
                <table className="table">
                    <tr>
                        <th></th>
                        <th>No</th>
                        <th>Job Position</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {data.map((application) => {
                        return (
                            <>
                                <tr key={application.apply_id} className="table-content">
                                    <td className="button-td">
                                        <button onClick={() => setExpand(!isExpand)}>
                                            {isExpand ?
                                                <MdExpandLess /> :
                                                <MdExpandMore />
                                            }
                                        </button>
                                    </td>
                                    <td>{application.apply_id}</td>
                                    <td>{application.career.title}</td>
                                    <td>{application.applicant.cv.name}</td>
                                    <td>{application.status.name}</td>
                                    <td ><AiOutlineFile /> <button onClick={() => handleSetInterview(application.status.status_id)}><AiOutlineLink /></button> <button><AiOutlineCheck onClick={() => handleAccept(application.apply_id, application.status.status_id)} /></button> <button onClick={() => handleReject(application.apply_id)}><AiOutlineClose /></button></td>

                                </tr>
                            </>
                        )
                    })}
                    <tr>
                        {isExpand && <TableRow />}
                    </tr>
                </table>
            </div>
        </>
    )
}
export default JobApplication;