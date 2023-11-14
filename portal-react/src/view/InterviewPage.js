import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import axios from "axios";
import { viewInterviews } from "../features/viewInterviewData";
import '../css/interviews.css'
import DataTable from "react-data-table-component";


export default function InterviewPage() {
    let dataApplyRow = []
    const [interviewList, setInterview] = useState([]);
    const url = useSelector((state) => state.interview.url)

    const columns = [
        {
            name: "Job Name",
            selector: row => row.job_name,
        },
        {
            name: "Interview Date",
            selector: row => row.interview_date
        },
        {
            name: "Link",
            selector: row => row.link
        },
    ]

    const customStyle = {
        table: {
            style: {
                borderRadius: "10px",

            },
        }
    }

    console.log(interviewList)
    interviewList.map(interview => {
        // let months = [
        //     "January",
        //     "February",
        //     "March",
        //     "April",
        //     "May",
        //     "June",
        //     "July",
        //     "August",
        //     "September",
        //     "October",
        //     "November",
        //     "December",
        // ];

        // let dateApply = new Date(interview.date);
        // var dayApply = dateApply.getDate();
        // var monthApply = dateApply.getMonth();
        // var yearApply = dateApply.getFullYear();
        dataApplyRow.push({
            job_name: interview.interview?.career?.title,
            // interview_date: dayApply + " " + months[monthApply] + " " + yearApply,
            interview_date: interview.interview_date,
            link: interview.link
        })
    })

    useEffect(() => {
        axios({
            url: url,
            method: "GET",
        })
            .then((response) => {
                console.log(response.data);
                setInterview(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [url])


    return (
        <div id="apply-div">
            <p id="apply-title">Interview List</p>
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
        // <div className="interview-container">
        //     <Table striped>
        //         <thead>
        //             <tr>
        //                 <th>#</th>
        //                 <th>Title Job</th>
        //                 <th>Interview Name</th>
        //                 <th>Date</th>
        //                 <th>Link</th>
        //             </tr>
        //         </thead>

        //         {interview.map((data, i) => {
        //             return (
        //                 <>
        //                     <tbody>
        //                         <tr key={data.interview_user_id}>
        //                             <td>{i + 1}</td>
        //                             <td>{data.interview?.career.title}</td>
        //                             <td>{data.link}</td>
        //                             <td>{data.interview_date}</td>
        //                             <td>{data.link}</td>
        //                         </tr>
        //                     </tbody>
        //                 </>
        //             )
        //         })}
        //     </Table>
        // </div>
    )
}