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
  const [data, setDataAdmin] = useState([]);
  const [dataApply, setData] = useState([]);
  const url = useSelector((state) => state.application.url);
  const [showToast, setShowToast] = useState(false);

  const [dataQJ, setDataQJ] = useState([]);
  const [scoreObject, setScoreObject] = useState([]);
  const [qualificationJobID, setQualificationJobID] = useState([]);
  const [expanded, setExpanded] = useState(false);
  console.log(dataQJ);

  let dataApplyRow = [];
  let dataApplyRowTA = [];

  const [dataScore, setDataScore] = useState({
    score: "",
    qualificationJob: {
      qualification_job_id: "",
    },
    qualification: {
      qualification_id: "",
    },
    career: {
      job_id: "",
    },
    apply: {
      apply_id: "",
    },
  });

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
        setDataAdmin(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(`http://localhost:8088/api/qualification_job/`)
      .then((response) => {
        console.log(response.data.result);
        setQualificationJobID(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // if(!loading){

    // }

    setRefresh(false);
  }, [refresh]);

  const getQJ = (id) => {
    axios
      .get("http://localhost:8088/api/qualification_job/" + id)
      .then((response) => {
        setDataQJ(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const columns = [
    // {
    //   name: "No.",
    //   selector: (row) => row.index,
    // },
    {
      name: "Job Name",
      selector: (row) => row.job_name,
    },
    {
      name: "Apply Date",
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
        let dateStart = new Date(row.apply_date);
        var dayStart = dateStart.getDate();
        var monthStart = dateStart.getMonth();
        var yearStart = dateStart.getFullYear();
        return dayStart + " " + months[monthStart] + " " + yearStart;
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  const columnsTA = [
    // {
    //   name: "No.",
    //   selector: (row) => row.index,
    // },
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
      sortable: true,
    },
    {
      name: "Applicant Name",
      selector: (row) => row.cv.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status.name,
    },
    {
      name: "Created At",
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
        let dateStart = new Date(row.date);
        var dayStart = dateStart.getDate();
        var monthStart = dateStart.getMonth();
        var yearStart = dateStart.getFullYear();
        return dayStart + " " + months[monthStart] + " " + yearStart;
      },
      sortable: true,
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
      index: apply.apply_id,
      job_name: apply.career.title,
      apply_date: apply.date.split("T")[0],
      status: apply.status?.name,
    });
  });

  data.map((apply) => {
    const buttonStatus = apply.status.status_id >= 5 ? true : false;
    const buttonInterview =
      apply.status.name === "HR Interview" ||
      apply.status.name === "User Interview" ||
      apply.status.name === "Offering"
        ? false
        : true;
    dataApplyRowTA.push({
      index: apply.apply_id,
      job_id: apply.career.job_id,
      job_name: apply.career.title,
      applicant_name: apply.cv.name,
      status: apply.status.name,
      action: (
        <div style={{display:'flex',alignItems:"center"}}>
          <a id="btn-cv" onClick={() => handleMakeCV(apply.applicant.user_id)}>
            <AiOutlineFile />
          </a>
          <p hidden={buttonInterview} style={{ paddingBottom: "5px", margin: "0px 5px" }}>|</p>

          <a
            id="btn-itv"
            hidden={buttonInterview}
            onClick={() =>
              handleSetInterview(
                apply.apply_id,
                apply.status.status_id,
                apply.career.job_id,
                apply.career.title,
                apply.cv.cv_id,
                apply.cv.name
              )
            }
          >
            <AiOutlineLink />
          </a>
          <p hidden={apply.status.name=="User Interview" || apply.status.name=="Accepted" || apply.status.name=="Rejected" ? true :false} style={{ paddingBottom: "5px", margin: "0px 5px" }}>|</p>

          <a
            id="btn-check"
            hidden={apply.status.name=="User Interview" || apply.status.name=="Accepted" || apply.status.name=="Rejected"}
            onClick={() => handleAccept(apply.apply_id, apply.status.status_id)}
          >
            <AiOutlineCheck />
          </a>
          <p hidden={apply.status.name=="User Interview" || apply.status.name=="Accepted" || apply.status.name=="Rejected"} style={{ paddingBottom: "5px", margin: "0px 5px" }}>|</p>

          <a
            id="btn-x"
            hidden={apply.status.name=="User Interview" || apply.status.name=="Accepted" || apply.status.name=="Rejected"}
            onClick={() => handleReject(apply)}
          >
            <AiOutlineClose />
          </a>
          {/* <Button
            id="btn-cv"
            variant="primary"
            onClick={() => handleMakeCV(apply.applicant.user_id)}
          >
            <AiOutlineFile />
          </Button>{" "} */}
          {/* <Button
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
          </Button>{" "} */}

          {/* <Button
            id="btn-check"
            variant="success"
            hidden={buttonStatus}
            onClick={() => handleAccept(apply.apply_id, apply.status.status_id)}
          >
            <AiOutlineCheck />
          </Button>{" "} */}
          {/* <Button
            id="btn-x"
            variant="danger"
            hidden={buttonStatus}
            onClick={() => handleReject(apply)}
          >
            <AiOutlineClose />
          </Button> */}
        </div>
      ),
    });
  });

  const handleAccept = async (id, statusId) => {
    const findApplication = dataApply.find(
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
    let applyDate = new Date(apply.date);
    let cooldownDate = new Date(applyDate.setMonth(applyDate.getMonth() + 6));
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
      cooldown_date:
        cooldownDate.getFullYear() +
        "-" +
        (cooldownDate.getMonth() + 1 < 10
          ? "0" + (cooldownDate.getMonth() + 1)
          : cooldownDate.getMonth() + 1) +
        "-" +
        (cooldownDate.getDate() < 10
          ? "0" + cooldownDate.getDate()
          : cooldownDate.getDate()),
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
        console.log(response);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetInterview = (
    apply_id,
    id,
    careerId,
    careerName,
    applicantId,
    applicantName
  ) => {
    localStorage.setItem("applyId", apply_id);
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
    if (id === 4) {
      navigate("/set-offering");
    }
  };

  const handleMakeCV = (id) => {
    localStorage.setItem("userId", id);
    navigate("/cv");
  };

  let handleChange = (e) => {
    const { name, value } = e.target;
    setDataScore((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveScore = async (apply_id, job_id, dataLength) => {
    console.log(apply_id);
    console.log(job_id);
    console.log(dataLength);

    let scoreObject = [];
    for (let i = 0; i < dataLength; i++) {
      setDataScore([
        ...dataScore,
        {
          score: dataScore.score,
          qualificationJob: {
            qualification_job_id: 1,
          },
          qualification: {
            qualification_id: 1,
          },
          career: {
            job_id: job_id,
          },
          apply: {
            apply_id: apply_id,
          },
        },
      ]);
    }

    // await axios({
    //   url: "http://localhost:8088/api/score/",
    //   method: "POST",
    //   data: JSON.stringify(object),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  const ExpandedComponent = ({ data }) => {
    let dataQualificationJobId = qualificationJobID.filter(
      (q) => q.career.job_id == data.job_id
    );
    return (
      <div style={{ margin: "20px", fontSize: "12px" }}>
        {dataQualificationJobId.map((QJ, index) => {
          return (
            <div
              style={{
                margin: "10px 10px",
                display: "flex",
                flexDirection: "column",
                width: "1150px",
              }}
            >
              <label>{QJ.qualification.name}</label>
              <div hidden>
                <input
                  name={`qualification_job_id_${index}`}
                  value={QJ.qualification.qualification_id}
                  type="text"
                />
              </div>
              <input
                name={`qualification_job_${index}`}
                // onChange={handleChange}
                type="text"
                hidden
              />
            </div>
          );
        })}

        <div
          style={{
            margin: "10px 10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Description</label>
          <textarea type="text" style={{ width: "915px", marginLeft: "0px" }} />
        </div>

        <div
          style={{
            margin: "10px 10px",
            display: "flex",
            width: "900px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() =>
              saveScore(data.index, data.job_id, dataQualificationJobId.length)
            }
            style={{
              border: "#CCCCCC 2px solid",
              borderRadius: "30px",
              height: "40px",
              width: "100px",
              backgroundColor: "white",
              color: "#93C953",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: "600",
            }}
          >
            SUBMIT
          </button>

          <button
            onClick={() => saveScore(data.index, data.job_id)}
            style={{
              border: "#CCCCCC 2px solid",
              borderRadius: "30px",
              height: "40px",
              width: "100px",
              backgroundColor: "white",
              color: "#93C953",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            ACCEPT
          </button>

          <button
            onClick={() => saveScore(data.index, data.job_id)}
            style={{
              border: "#CCCCCC 2px solid",
              borderRadius: "30px",
              height: "40px",
              width: "100px",
              backgroundColor: "white",
              color: "#93C953",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            REJECT
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        id={
          localStorage.getItem("role") === "Admin" ||
          localStorage.getItem("role") === "TA" ||
          localStorage.getItem("role") === "Trainer"
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
                // expandableRows
                // expandableRowsComponent={ExpandedComponent}
                // freezeWhenExpanded={true}
                customStyles={customStyle}
                pagination
                fixedHeader
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
