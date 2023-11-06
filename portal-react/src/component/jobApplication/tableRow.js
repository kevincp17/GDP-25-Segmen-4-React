import React from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";
import './tableRow.css';

function TableRow() {
    return (
        <>
            <td></td>
            <td colSpan={5} className="expand">
                <form className="form">
                    <div>
                        <label>Java</label> <br />
                        <input placeholder="score" type="text"></input>
                    </div>
                    <div>
                        <label>SQL</label> <br />
                        <input placeholder="score" type="text"></input>
                    </div>
                    <div>
                        <label>Concept</label> <br />
                        <input placeholder="score" type="text"></input>
                    </div>
                    <button>save</button>
                </form>
            </td>
            <td></td>
            <td></td>
            <td></td>
        </>
    )
}

export default TableRow;