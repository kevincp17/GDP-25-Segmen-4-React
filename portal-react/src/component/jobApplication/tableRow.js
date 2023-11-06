import React from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";

function TableRow() {
    return (
        <>
            <tr>
                <td></td>
                <td></td>
                <td>
                    <form>
                        <div>
                            <label>Java</label>
                            <input placeholder="score"></input>
                        </div>
                        <div>
                            <label>SQL</label>
                            <input placeholder="score"></input>
                        </div>
                        <div>
                            <label>Concept</label>
                            <input placeholder="score"></input>
                        </div>
                    </form>
                </td>
            </tr>
        </>
    )
}

export default TableRow;