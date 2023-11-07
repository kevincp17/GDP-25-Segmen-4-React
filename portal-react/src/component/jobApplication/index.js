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

    useEffect(() => {
        axios({
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
    }, [url])

    useEffect(() => { }, [isExpand])
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
                                    <td>{application.status}</td>
                                    <td><AiOutlineFile /> <AiOutlineLink /> <AiOutlineCheck /> <AiOutlineClose /></td>
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