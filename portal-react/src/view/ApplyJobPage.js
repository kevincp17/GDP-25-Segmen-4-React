import React, { useState, useEffect } from "react";
import $ from "jquery";
import "../css/apply.css";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineFile,
  AiOutlineLink,
} from "react-icons/ai";
import { useSelector } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";

export default function ApplyJobPage() {
  const navigate = useNavigate();
  const [applyList, setApplyList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [records, setRecords] = useState([]);
  const [isExpand, setExpand] = useState(false);
  const [data, setData] = useState([]);
  const url = useSelector((state) => state.application.url);
  const [showToast, setShowToast] = useState(false);
  console.log(data);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/apply/" + localStorage.getItem("userId"))
      .then((response) => {
        setApplyList(response.data.result);
        setData(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url)
      .then((response) => {
        setData(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    setRefresh(false);
  }, [refresh]);

  let dataApplyRow = [];
  let dataApplyRowTA = [];

  const columns = [
    {
      name: "Job Name",
      selector: (row) => row.job_name,
    },
    {
      name: "Apply Date",
      selector: (row) => row.apply_date,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  const columnsTA = [
    {
      name: "Job Name",
      selector: (row) => row.job_name,
    },
    {
      name: "Applicant Name",
      selector: (row) => row.applicant_name,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const columnApplyAdmin = [
    {
      name: "Job Name",
      selector: (row) => row.career.title,
      sortable:true
    },
    {
      name: "Applicant Name",
      selector: (row) => row.cv.name,
      sortable:true
    },
    {
      name: "Status",
      selector: (row) => row.status.name,
    },
    {
      name: "Created At",
      selector: (row) =>{
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
        let dateStart = new Date(row.date);
        var dayStart = dateStart.getDate();
        var monthStart = dateStart.getMonth();
        var yearStart = dateStart.getFullYear();
        return dayStart+" "+months[monthStart]+" "+yearStart
      },
      sortable:true
    },
  ];

  const customStyle = {
    table: {
      style: {
        borderRadius: "10px",
      },
    },
  };

  applyList.map((apply) => {
    dataApplyRow.push({
      job_name: apply.career.title,
      apply_date: apply.date.split("T")[0],
      status: apply.status?.name,
    });
  });

  data.map((apply) => {
    const buttonStatus = apply.status.status_id >= 5 ? true : false;
    const buttonInterview =
      apply.status.name === "HR Interview" ||
      apply.status.name === "User Interview"
        ? false
        : true;
    dataApplyRowTA.push({
      job_name: apply.career.title,
      applicant_name: apply.cv.name,
      status: apply.status.name,
      action: (
        <>
          <Button
            id="btn-cv"
            variant="primary"
            onClick={() => handleMakeCV(apply.applicant.user_id)}
          >
            <AiOutlineFile />
          </Button>{" "}
          <Button
            id="btn-itv"
            variant="secondary"
            hidden={buttonInterview}
            onClick={() =>
              handleSetInterview(
                apply.status.status_id,
                apply.career.job_id,
                apply.career.title,
                apply.cv.cv_id,
                apply.cv.name
              )
            }
          >
            <AiOutlineLink />
          </Button>{" "}
          <Button
            id="btn-check"
            variant="success"
            hidden={buttonStatus}
            onClick={() => handleAccept(apply.apply_id, apply.status.status_id)}
          >
            <AiOutlineCheck />
          </Button>{" "}
          <Button
            id="btn-x"
            variant="danger"
            hidden={buttonStatus}
            onClick={() => handleReject(apply)}
          >
            <AiOutlineClose />
          </Button>
        </>
      ),
    });
  });

  const handleAccept = async (id, statusId) => {
    const findApplication = data.find(
      (application) => application.apply_id === id
    );
    if (!findApplication) {
      return null;
    }

    const finalStatus = () => {
      if (statusId < 5) {
        statusId += 1;
      }
      return statusId;
    };
    const finalStatusId = finalStatus();

    const object = {
      apply_id: id,
      status: {
        status_id: finalStatusId,
      },
    };
    await axios({
      url: "http://localhost:8088/api/apply/" + id,
      method: "POST",
      data: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application status has been updated",
          showConfirmButton: false,
        })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
        // show();
        setRefresh(true);
        // navigate("/apply_job")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const show = async () => {
    await axios({
      url: url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReject = async (apply) => {
    console.log(apply);
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
    let applyDate=new Date(apply.date)
    let cooldownDate=new Date(applyDate.setMonth(applyDate.getMonth()+6))
    console.log(cooldownDate);
    const findApplication = data.find(
      (application) => application.apply_id === apply.apply_id
    );

    if (!findApplication) {
      return null;
    }

    const object = {
      apply_id: apply.apply_id,
      status: {
        status_id: 6,
      },
      cooldown_date:cooldownDate.getFullYear()+"-"+(cooldownDate.getMonth()+1 <10 ? "0"+(cooldownDate.getMonth()+1) : cooldownDate.getMonth()+1)+"-"+(cooldownDate.getDate() < 10 ? "0"+cooldownDate.getDate() : cooldownDate.getDate())
    };
    console.log(object);
    await axios({
      url: "http://localhost:8088/api/apply/" + apply.apply_id,
      method: "POST",
      data: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // setShowToast(true)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application status has been updated",
          showConfirmButton: false,
          timer: 2000,
        })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
        // show();
        setRefresh(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetInterview = (
    id,
    careerId,
    careerName,
    applicantId,
    applicantName
  ) => {
    localStorage.setItem("careerId", careerId);
    localStorage.setItem("careerName", careerName);
    localStorage.setItem("applicantId", applicantId);
    localStorage.setItem("applicantName", applicantName);

    if (id === 2) {
      navigate("/setinterview-ta");
    }
    if (id === 3) {
      navigate("/setinterview-trainer");
    }
  };

  const handleMakeCV = (id) => {
    localStorage.setItem("userId", id);
    navigate("/cv");
  };

  return (
    <>
      <div
        id={
          localStorage.getItem("role") === "Admin"
            ? "apply-div-adm"
            : "apply-div"
        }
      >
        {localStorage.getItem("role") === "Admin" ? (
          <>
            <div id="apply-table-adm">
            <h1>Job Appliance List</h1>
            <DataTable
            columns={columnApplyAdmin}
            data={data}
            customStyles={customStyle}
            pagination
            fixedHeader
          />
            </div>
          </>
        ) : (
          <>
            <p id="apply-title">Apply Job List</p>
            <div id="data-tb-apply">
              <DataTable
                className="rdt_Table"
                columns={
                  localStorage.getItem("role") === "TA" ? columnsTA : columns
                }
                data={
                  localStorage.getItem("role") === "TA"
                    ? dataApplyRowTA
                    : dataApplyRow
                }
                customStyles={customStyle}
                pagination
                fixedHeader
              />
            </div>
          </>
        )}
      </div>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "#ccffcc",
        }}
      >
        <Toast.Body>Application status updated successfully</Toast.Body>
      </Toast>
    </>
  );
}
