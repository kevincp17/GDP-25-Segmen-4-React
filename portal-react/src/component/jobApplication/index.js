import { GrCheckmark, GrDocumentText, GrFormCheckmark } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";
import './index.css';
import { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import TableSection from "./tableSection";
import TableRow from "./tableRow";

function JobApplication() {
    const [isExpand, setExpand] = useState(false)

    useEffect(() => { }, [isExpand])
    return (
        <>
            <div className="container">
                <table className="table">
                    <thead>
                        <th></th>
                        <th>No</th>
                        <th>Job Position</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
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