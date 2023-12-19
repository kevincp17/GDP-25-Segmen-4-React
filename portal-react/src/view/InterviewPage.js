import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import axios from "axios";
import { viewInterviews } from "../features/viewInterviewData";
import "../css/interviews.css";
import DataTable from "react-data-table-component";
import { Button } from "@mui/material";
import { AiOutlineFile } from "react-icons/ai";
import { CiLink } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";

export default function InterviewPage() {
  let dataInterviewRow = [];
  const [interviewList, setInterview] = useState([]);
  const [interviewTrainer, setInterviewTrainer] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [qualificationJobID, setQualificationJobID] = useState([]);
  const [dataScore, setDataScore] = useState([]);
  const [averageScore, setAverageScore] = useState([]);
  const [inputForm, setInputForm] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [scoreUpdate, setScoreUpdate] = useState(false);
  const [selectedScores, setSelectedScores] = useState([]);

  const url = useSelector((state) => state.interview.url);
  const navigate = useNavigate();

  let interviewUserAccept=[]
  let interviewUserAllScore=[]
  
  for(let i=0;i<accepted.length;i++){
    for(let j=0;j<interviewTrainer.length;j++){
      if(accepted[i].applicant.user_id==interviewTrainer[j].applicant.user_id && accepted[i].career.job_id==interviewTrainer[j].interview.career.job_id){
        interviewUserAccept.push(interviewTrainer[j])
      }
    }
  }

  console.log(interviewUserAccept);
  for(let i=0;i<interviewUserAccept.length;i++){
    for(let j=0;j<dataScore.length;j++){
      if(dataScore[j].interviewUser.interview_user_id == interviewUserAccept[i].interview_user_id){
        interviewUserAllScore.push(dataScore[j])
      }
    }
  }

  let sumAllScores=0
  interviewUserAllScore.map(as=>{
    sumAllScores+=as.score
  })


  useEffect(() => {
    if (localStorage.getItem("role") === "TA") {
      getTAData();
    } else if (localStorage.getItem("role") === "Applicant") {
      getApplicantData();
    } else if (localStorage.getItem("role") === "Trainer") {
      getTrainerData();
    }
    axios({
      url: "http://localhost:8088/api/qualification_job/",
      method: "GET",
    })
      .then((response) => {
        console.log(response.data.result);
        setQualificationJobID(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get("http://localhost:8088/api/score")
      .then((response) => {
        setDataScore(response.data.result)
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get("http://localhost:8088/api/interviews/trainer")
      .then((response) => {
        setInterviewTrainer(response.data.result)
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get("http://localhost:8088/api/applyaccept")
      .then((response) => {
        console.log(response.data.result);
        setAccepted(response.data.result)
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get("http://localhost:8088/api/interviewsTrainer/average")
      .then((response) => {
        console.log(response.data.result);
        setAverageScore(response.data.result)
      })
      .catch((error) => {
        console.log(error);
      });
      
      setRefresh(false)
  }, [refresh]);

  let handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const columns = [
    {
      name: "Job Name",
      selector: (row) => row.interview.career.title,
    },
    {
      name: "Date",
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
    {
      name: "Time",
      selector: (row) => {
        let dateStart = new Date(row.interview_date);
        var hourStart = dateStart.getHours();
        var minuteStart = dateStart.getMinutes();
        return (
          hourStart + ":" + minuteStart + " " + (hourStart >= 12 ? "PM" : "AM")
        );
      },
    },
    {
      name: "Link",
      selector: (row) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <Button
              id="btn-cv"
              variant="primary"
              onClick={() => handleMakeCV(row.applicant.user_id)}
              style={{marginRight:'5px'}}
            >
              <AiOutlineFile />
            </Button> */}

            {/* <Button
              id="btn-link"
              variant="secondary"
              href={row.link}
            >
              <CiLink />
            </Button> */}
            <a href={row.link} id="btn-link">
              <CiLink />
            </a>
          </div>
        );
      },
    },
  ];

  const columnsScore = [
    {
      name: "Skill Name",
      selector: (row) => row.qualificationJob.qualification.name,
    },
    {
      name: "Score",
      selector: (row) => row.score,
    },
  ];

  const columnsTA = [
    {
      name: "Job Name",
      selector: (row) => row.interview.career.title,
    },
    {
      name: "Applicant Name",
      selector: (row) => row.cv.name,
    },
    {
      name: "TA Name",
      selector: (row) => row.cv_ta.name,
    },
    {
      name: "Date",
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
    {
      name: "Time",
      selector: (row) => {
        let dateStart = new Date(row.interview_date);
        var hourStart = dateStart.getHours();
        var minuteStart = dateStart.getMinutes();
        return (
          hourStart + ":" + minuteStart + " " + (hourStart >= 12 ? "PM" : "AM")
        );
      },
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <Button
              id="btn-cv"
              variant="primary"
              onClick={() => handleMakeCV(row.applicant.user_id)}
              style={{marginRight:'5px'}}
            >
              <AiOutlineFile />
            </Button> */}

            {/* <Button
              id="btn-link"
              variant="secondary"
              href={row.link}
            >
              <CiLink />
            </Button> */}
            <a id="btn-cv" onClick={() => handleMakeCV(row.applicant.user_id)}>
              <AiOutlineFile />
            </a>
            <p style={{ paddingBottom: "5px", margin: "0px 5px" }}>|</p>
            <a href={row.link} id="btn-link">
              <CiLink />
            </a>
          </div>
        );
      },
      width: "180px",
    },
  ];

  const columnsTrainer = [
    {
      name: "Job Name",
      selector: (row) => row.interview.career.title,
    },
    {
      name: "Applicant Name",
      selector: (row) => row.cv.name,
    },
    {
      name: "Trainer Name",
      selector: (row) => row.cv_trainer.name,
    },
    {
      name: "Date",
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
    {
      name: "Time",
      selector: (row) => {
        let dateStart = new Date(row.interview_date);
        var hourStart = dateStart.getHours();
        var minuteStart = dateStart.getMinutes();
        return (
          hourStart + ":" + minuteStart + " " + (hourStart >= 12 ? "PM" : "AM")
        );
      },
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <Button
              id="btn-cv"
              variant="primary"
              onClick={() => handleMakeCV(row.applicant.user_id)}
              style={{marginRight:'5px'}}
            >
              <AiOutlineFile />
            </Button> */}

            {/* <Button
              id="btn-link"
              variant="secondary"
              href={row.link}
            >
              <CiLink />
            </Button> */}
            <a id="btn-cv" onClick={() => handleMakeCV(row.applicant.user_id)}>
              <AiOutlineFile />
            </a>
            <p style={{ paddingBottom: "5px", margin: "0px 5px" }}>|</p>
            <a href={row.link} id="btn-link">
              <CiLink />
            </a>
          </div>
        );
      },
    },
  ];

  const customStyle = {
    table: {
      style: {
        borderRadius: "10px",
      },
    },
  };

  const getApplicantData = () => {
    axios({
      url: url + localStorage.getItem("userId"),
      method: "GET",
    })
      .then((response) => {
        setInterview(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTAData = () => {
    axios({
      url: url + "ta",
      method: "GET",
    })
      .then((response) => {
        console.log(response.data.result);
        setInterview(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTrainerData = () => {
    axios({
      url:
        "http://localhost:8088/api/interviewsTrainer/" +
        localStorage.getItem("userId"),
      method: "GET",
    })
      .then((response) => {
        console.log(response.data.result);
        setInterview(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMakeCV = (id) => {
    localStorage.setItem("cvuserId", id);
    navigate("/cv");
  };

  const saveScore = (apply, dataLength) => {
    console.log(apply);
    console.log(dataLength);

    let scoreObject = [];
    for (let i = 0; i < dataLength; i++) {
      console.log($(`#qualification_job_${i}`).val());
      console.log($(`#qualification_job_id_${i}`).val());
      console.log($('#score_des').val());
      let objScore={
        score: $(`#qualification_job_${i}`).val(),
        description:$('#score_des').val(),
          qualificationJob: {
            qualification_job_id: $(`#qualification_job_id_${i}`).val(),
          },
          interviewUser: {
            interview_user_id: apply.interview_user_id,
          },
      }
      
        axios
      .post("http://localhost:8088/api/score", JSON.stringify(objScore), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRefresh(true)
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const updateScore=(id)=>{
    let dataScoresUpdate = dataScore.filter(
      (q) => q.interviewUser.interview_user_id == id
    );
    setSelectedScores(dataScoresUpdate)
    setScoreUpdate(true)
  }

  const ExpandedComponent = ({ data }) => {
    console.log(data);
    let dataQualificationJobId = qualificationJobID.filter(
      (q) => q.career.job_id == data.interview.career.job_id
    );

    let dataScores = dataScore.filter(
      (q) => q.interviewUser.interview_user_id == data.interview_user_id
    );

    let averageJobScore = averageScore.filter(
      (a) => a[0] == data.interview.career.job_id
    );
    console.log(averageJobScore.length);
    console.log(dataQualificationJobId);
    console.log(dataScores);
  
    let scoreSum=0
    dataScores.map(sc=>scoreSum+=sc.score)

    const handleAcceptApplicant=(apply)=>{
      console.log(apply);
      axios
      .get("http://localhost:8088/api/apply/" + apply.applicant.user_id+"/"+apply.interview.career.job_id)
      .then((response) => {
        const object = {
          apply_id: response.data.result[0].apply_id,
          status: {
            status_id: 4,
          },
        };
        console.log(object);
        
        axios({
        url: "http://localhost:8088/api/apply/" + response.data.result[0].apply_id,
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
          // navigate("expand/apply_job")
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
    }

    const handleRejectApplicant=(apply)=>{
      console.log(apply);
      axios
      .get("http://localhost:8088/api/apply/" + apply.applicant.user_id+"/"+apply.interview.career.job_id)
      .then((response) => {
        const object = {
          apply_id: response.data.result[0].apply_id,
          status: {
            status_id: 6,
          },
        };
        console.log(object);
        
        axios({
        url: "http://localhost:8088/api/apply/" + response.data.result[0].apply_id,
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
          // navigate("/apply_job")
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
    }

    return (
      <div style={{ margin: "20px", fontSize: "12px" }}>
        {
        dataScores.length>0 && !scoreUpdate
        ?
        <div style={{display:"flex",flexDirection:'column' }}>
        <DataTable
        className="rdt_Table"
        columns={columnsScore}
        data={dataScores}
        customStyles={customStyle}
          />
          <div style={{display:'flex'}}>
            <h1 style={{flexBasis:'50%'}}>Description</h1>
            <p style={{fontSize:'16px',display:'flex',alignItems:'flex-end',marginLeft:'170px'}}>Result: 
            {
            averageJobScore.length==0 
            ? 
            scoreSum/dataScores.length<70 
            ? <b style={{color:'#D62F40'}}> Not Recommended</b> : <b style={{color:'#93C953'}} > Recommended</b>
            : 
            scoreSum/dataScores.length<averageJobScore[0][1] ? <b style={{color:'#D62F40'}}> Not Recommended</b> : <b style={{color:'#93C953'}} > Recommended</b>} </p>
          </div>
          <p style={{marginTop:"-10px",fontSize:'16px'}}>{dataScores[0].description!=null ? dataScores[0].description : "No Description"}</p>

          {
            data.apply.status.status_id==3
            ?
            <div
            style={{
              margin: "10px 10px",
              display: "flex",
              width: "750px",
              justifyContent: "flex-end",
            }}
          >
            <button
            onClick={()=>handleAcceptApplicant(data)}
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
            onClick={()=>handleRejectApplicant(data)}
              style={{
                border: "#CCCCCC 2px solid",
                borderRadius: "30px",
                height: "40px",
                width: "100px",
                backgroundColor: "white",
                color: "#D62F40",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              REJECT
            </button>
          </div>
          :
          null
          }
          
        </div>
        :
        <div>
          <h1 style={{marginLeft:'40px'}}>Skill Evaluation</h1>
          {
          dataQualificationJobId.map((QJ, index) => {
            // console.log(selectedScores[index].score);
            // console.log(selectedScores[index]==undefined);
            if(selectedScores[index]!=undefined){
              $(`#qualification_job_${index}`).val(selectedScores[index].score)
              $(`#score_des`).val(selectedScores[index].description)
            }
            else{
              $(`#qualification_job_${index}`).val("")
            }
            
          return (
            <div
              style={{
                margin: "10px 10px 10px 40px",
                display: "flex",
                flexDirection: "column",
                width: "800px",
              }}
            >
              <label>{QJ.qualification.name}</label>
              <div hidden>
                <input
                  id={`qualification_job_id_${index}`}
                  name={`qualification_job_id_${index}`}
                  value={QJ.qualification_job_id}
                  type="text"
                />
              </div>
              <input
                id={`qualification_job_${index}`}
                name={`qualification_job_${index}`}
                type="text"
              />
            </div>
          );
        })}

        <div
          style={{
            margin: "10px 10px 10px 40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Description</label>
          <textarea id="score_des" type="text" style={{ width: "635px", marginLeft: "0px" }} />
        </div>

        <div
          style={{
            margin: "10px 10px 10px 10px",
            display: "flex",
            width: "750px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => saveScore(data, dataQualificationJobId.length)}
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

            {
              scoreUpdate && dataScores.length>0
              ?
              <button
            onClick={() => setScoreUpdate(false)}
            style={{
              border: "#CCCCCC 2px solid",
              borderRadius: "30px",
              height: "40px",
              width: "100px",
              backgroundColor: "white",
              color: "#93C953",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: "600",
              marginLeft:"10px",
              marginRight:"80px"
            }}
          >
            CANCEL
          </button>
              :
              null
            }
        </div>
        </div>
        }
      </div>
    );
  };

  return (
    <div
      id={
        localStorage.getItem("role") === "Admin" ||
        localStorage.getItem("role") === "TA" ||
        localStorage.getItem("role") === "Trainer"
          ? "apply-div-adm"
          : "apply-div"
      }
    >
      <p id="apply-title">
        {localStorage.getItem("role") === "TA"
          ? "Interview TA List"
          : localStorage.getItem("role") === "Trainer"
          ? "Interview Trainer List"
          : localStorage.getItem("role") === "Applicant"
          ? "Interview Applicant List"
          : null}
      </p>
      <div id="data-tb-apply">
        {localStorage.getItem("role") === "Trainer" ? (
          <DataTable
            className="rdt_Table"
            columns={
              localStorage.getItem("role") === "TA"
                ? columnsTA
                : localStorage.getItem("role") === "Trainer"
                ? columnsTrainer
                : columns
            }
            data={interviewList}
            customStyles={customStyle}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            freezeWhenExpanded={true}
            pagination
            fixedHeader
          />
        ) : (
          <DataTable
            className="rdt_Table"
            columns={
              localStorage.getItem("role") === "TA"
                ? columnsTA
                : localStorage.getItem("role") === "Trainer"
                ? columnsTrainer
                : columns
            }
            data={interviewList}
            customStyles={customStyle}
            pagination
            fixedHeader
          />
        )}
      </div>
    </div>
  );
}
