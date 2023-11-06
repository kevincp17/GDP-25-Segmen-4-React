import React from "react";
import TableRow from "./tableRow";
import { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { AiOutlineCheck, AiOutlineClose, AiOutlineFile, AiOutlineLink } from "react-icons/ai";

function TableSection() {
    // const [isExpand, setExpand] = useState(false)

    // useEffect(() => { }, [isExpand])
    return (
        <>
            {/* <tbody>
                <tr>
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
                {isExpand && <TableRow />}
            </tbody> */}
        </>
    )
}

export default TableSection;