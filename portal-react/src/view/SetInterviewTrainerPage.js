import React, { useEffect } from "react";
import "../css/setinterview.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SetInterviewTrainerPage() {
  const [trainer, setTrainer] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({
    interview_date: "",
    link: "",
    status: {
      status_id: 3,
    },
    interview: {
      interview_name: localStorage.getItem("statusName"),
      career: {
        job_id: localStorage.getItem("careerId"),
      },
    },
    trainer: {
      user_id: "",
    },
    ta: {
        user_id: localStorage.getItem("userId"),
      },
    applicant: {
      user_id: localStorage.getItem("applicantId"),
    },
    cv: {
        cv_id: localStorage.getItem("applicantId")
    }
  });

  useEffect(() => {
    axios
      .get("http://localhost:8088/profile/trainer")
      .then((response) => {
        setTrainer(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  }, []);

  const applicantName = localStorage.getItem("applicantName");
  const careerName = localStorage.getItem("careerName");

  let handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: name === "trainer" ? { user_id: value } : value,
    }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let object = {
      interview_date: data.interview_date,
      link: data.link,
      status: {
        status_id: 3,
      },
      interview: {
        interview_name: data.interview.interview_name,
        career: {
          job_id: data.interview.career.job_id,
        },
      },
      trainer: {
        user_id: data.trainer.user_id,
      },
      ta: {
        user_id: localStorage.getItem("userId"),
      },
      applicant: {
        user_id: data.applicant.user_id,
      },
      cv: {
        cv_id: data.cv.cv_id
    }
    };

    axios({
      url: "http://localhost:8088/api/interviews",
      method: "POST",
      data: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Data has been saved",
      showConfirmButton: false,
      timer: 2000,
    })
      .then(() => {
        navigate("/apply_job");
      })
      .catch((error) => {
        console.log(error);
      });
  };

//   const filtertrainer = trainer.filter(
//     (trainer) => trainer.role?.role_id === 2
//   );

  return (
    <div id="setinterview-container">
      <div id="setinterview-card">
        <form id="setinterview-form">
          <div>
            <h1>Set Interview Trainer</h1>
          </div>
          <div>
            <input
              name="interview"
              type="text"
              value={data.interview.interview_name}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <input
              name="career"
              type="text"
              value={careerName}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <input
              name="applicant"
              value={applicantName}
              type="text"
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <select
              name="trainer"
              value={data.trainer.user_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Trainer
              </option>
              {trainer.map((tr) => {
                return (
                  <option key={tr.user.user_id} value={tr.user.user_id}>
                    {tr.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              name="interview_date"
              type="datetime-local"
              value={data.interview_date}
              onChange={handleChange}
              placeholder="Date"
            />
          </div>
          <div>
            <input
              name="link"
              type="text"
              value={data.link}
              onChange={handleChange}
              placeholder="Link"
            />
          </div>
          <div hidden>
            <input
              name="status"
              type="text"
              value={data.status.status_id}
              onChange={handleChange}
              hidden
            />
          </div>
          <div id="button-container">
            <button onClick={handleSubmit} type="submit" id="button">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
