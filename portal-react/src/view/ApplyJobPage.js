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
  let dataApplyRow = [];
  let dataApplyRowTA = [];

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
            onClick={() => handleReject(apply.apply_id)}
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
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application status has been updated",
          showConfirmButton: false,
        })
          .then(() => { })
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

  const handleReject = async (id) => {
    const findApplication = data.find(
      (application) => application.apply_id === id
    );
    if (!findApplication) {
      return null;
    }

    const object = {
      apply_id: id,
      status: {
        status_id: 6,
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
        // setShowToast(true)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application status has been updated",
          showConfirmButton: false,
          timer: 2000,
        })
          .then(() => { })
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
    // if (id === 4){
    //   navigate("/set-offering");
    // }
  };

  const handleMakeCV = (id) => {
    localStorage.setItem("userId", id);
    navigate("/cv");
  };

  // const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const ExpandedComponent = ({data}) => {
    console.log(data)
    return(
      <div style={{margin:"20px", fontSize:"12px"}}>
        <p>{data.applicant_name}</p>
        <label>SQL : </label><br/>
        <input style={{marginBottom: "10px"}}/><br/>

        <label>Java : </label><br/>
        <input style={{marginBottom: "10px"}}/><br/>

        <label>OOP : </label><br/>
        <input style={{marginBottom: "10px"}}/><br/>

        <button style={{backgroundColor: "green", border: "1px #4d79ff solid", borderRadius: "3px", color: "white"}}>save</button>
      </div>
    )
  }


  return (
    <>
      <div id="apply-div">
        <p id="apply-title">Apply Job List</p>
        <div id="data-tb-apply">
          <DataTable
            className="rdt_Table"
            columns={
              localStorage.getItem("role") === "TA" ? columnsTA : columns
            }
            data={
              localStorage.getItem("role") === "TA" ? dataApplyRowTA : dataApplyRow
            }
            expandableRows expandableRowsComponent={ExpandedComponent}
            customStyles={customStyle}
            pagination
            fixedHeader
          />
        </div>
      </div>
    </>
  );
}
