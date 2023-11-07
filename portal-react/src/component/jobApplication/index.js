import { GrCheckmark, GrDocumentText, GrFormCheckmark } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";
import './index.css';
import { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import TableSection from "./tableSection";
import TableRow from "./tableRow";
import axios from "axios";

function JobApplication() {
    const [isExpand, setExpand] = useState(false)
    const [data, setData] = useState([{}])

    useEffect(() => {
        axios({
            url: "http://localhost:8088/api/application",
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => {
            setData(response.data.results)
            console.log(response.data.results)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => { }, [isExpand])
    return (
        <>
            <div className="container">
                <table className="table">
                    <tbody>
                        {data.map(x => {
                            return (
                                <>
                                    <tr key={data.id}>
                                        <td>{data.career.title}</td>
                                        <td>{data.applicant}</td>
                                        <td>{starwar.mass}</td>
                                    </tr>
                                </>
                            )
                        })}
                        <th></th>
                        <th>No</th>
                        <th>Job Position</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                        <tr className="table-content">
                            <td className="button-td">
                                <button onClick={() => setExpand(!isExpand)}>
                                    {isExpand ?
                                        <MdExpandLess /> :
                                        <MdExpandMore />
                                    }
                                </button>
                            </td>
                            <td>1</td>
                            <td>GDP</td>
                            <td>Bambang</td>
                            <td>On Progress</td>
                            <td><AiOutlineFile /> <AiOutlineLink /> <AiOutlineCheck /> <AiOutlineClose /></td>
                        </tr>
                        <tr>
                            {isExpand && <TableRow />}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default JobApplication;