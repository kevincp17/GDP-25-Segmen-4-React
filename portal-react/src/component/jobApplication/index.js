import { GrCheckmark, GrDocumentText, GrFormCheckmark } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";
import './index.css';
import TableSection from "./tableSection";

function JobApplication() {
    return (
        <>
            <h1> this is job application</h1>

            <table>
                <thead>
                    <td></td>
                    <th>No</th>
                    <th>Job Position</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                </thead>
                <TableSection/>
            </table>
        </>
    )
}

export default JobApplication;