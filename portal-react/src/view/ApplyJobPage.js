import React, { useState, useEffect } from "react";
import $ from "jquery";
import "../css/apply.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DataTable from "react-data-table-component"
import SearchIcon from "@mui/icons-material/Search";

export default function ApplyJobPage() {
  let dataApplyRow=[]
  const [applyList, setApplyList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [records,setRecords]=useState([])

  const columns=[
    {
      name:"Job Name",
      selector:row=>row.job_name,
    },
    {
      name:"Apply Date",
      selector:row=>row.apply_date
    },
    {
      name:"Status",
      selector:row=>row.status
    },
  ]

  const customStyle={
    table: {
      style: {
        borderRadius:"10px",
        
      },
    }
  }
  applyList.map(apply=>{
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

    let dateApply = new Date(apply.date);
    var dayApply = dateApply.getDate();
    var monthApply = dateApply.getMonth();
    var yearApply = dateApply.getFullYear();
    dataApplyRow.push({
      job_name:apply.career.title,
      apply_date:dayApply+" "+months[monthApply]+" "+yearApply,
      status:"Screening CV"
    })
  })

  const handleFilter=(e)=>{
    let newData=dataApplyRow.filter(row=>{
      // console.log((row.job_name.toLowerCase()));
      // return row.job_name.title.toLowerCase().includes(e.target.value.toLowerCase()
      return row.job_name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    console.log(newData);
    dataApplyRow=newData
    // setRecords(newData)

  }

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/apply/" + localStorage.getItem("userId"))
      .then((response) => {
        console.log(response.data.result);
        setApplyList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
    setRefresh(false);
  }, [refresh]);

  return (
    <div id="apply-div">
      <p id="apply-title">Apply Job List</p>
      {/* <table id="apply-table" style={{ width: "width:100%" }}>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Apply Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applyList.map((apply) => {
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

            let dateApply = new Date(apply.date);
            var dayApply = dateApply.getDate();
            var monthApply = dateApply.getMonth();
            var yearApply = dateApply.getFullYear();
            return (
              <tr>
                <td>{apply.career.title}</td>
                <td>{dayApply + " " + months[monthApply] + " " + yearApply}</td>
                <td>{apply.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <div id="input-filter">
        <input type="text" onChange={handleFilter} placeholder="Search job appliance"/>
        <SearchIcon className="apply-search-icon"/>
      </div>
      <div id="data-tb-apply">
        <DataTable 
        className="rdt_Table"
        columns={columns} 
        data={dataApplyRow} 
        customStyles={customStyle}
        pagination
        fixedHeader/>
      </div>
    </div>
  );
}
