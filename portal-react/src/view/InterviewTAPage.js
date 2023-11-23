import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "../css/interview-ta.css";

export default function InterviewTAPage() {
  const [interviewTAList, setInterviewTAList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/interviews/ta")
      .then((response) => {
        console.log(response.data.result);
        setInterviewTAList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  }, []);

  const customStyle = {
    table: {
      style: {
        borderRadius: "10px",
      },
    },
  };

  const columnsInterviewTA = [
    {
      name: "Applicant Name",
      selector: (row) => row.cv.name,
    },
    {
      name: "Interview Name",
      selector: (row) => row.interview.interview_name,
    },
    {
      name: "Job Title",
      selector: (row) => row.interview.career.title,
    },
    {
      name: "Interview Date",
      selector: (row) => {
        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let dateStart = new Date(row.interview_date);
        var dayStart = dateStart.getDate();
        var monthStart = dateStart.getMonth();
        var yearStart = dateStart.getFullYear();
        return dayStart + " " + months[monthStart] + " " + yearStart;
      },
    },
  ];
  return (
    <div id="ta-table-adm">
      <h1>Talent Acquisition Interview List</h1>
      <DataTable
        className="rdt_Table"
        columns={columnsInterviewTA}
        data={interviewTAList}
        customStyles={customStyle}
        pagination
        fixedHeader
      />
    </div>
  );
}
