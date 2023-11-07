import React, { useState, useEffect } from "react";
import DataTable from "datatables.net-dt";
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

export default function ApplyJobPage() {
  const [applyList, setApplyList] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/apply/" + localStorage.getItem("userId"))
      .then((response) => {
        console.log(response);
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
      <table id="apply-table" style={{ width: "width:100%" }}>
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
      </table>

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Name</TableCell>
              <TableCell>Apply Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applyList.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}
