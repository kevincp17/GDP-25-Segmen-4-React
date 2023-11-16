import React, { useEffect } from "react";
import "../css/setinterview.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { responsiveFontSizes } from "@mui/material";

export default function SetInterviewTAPage() {
  const [ta, setTa] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({
    interview_date: "",
    link: "",
    status: {
      status_id: 2,
    },
    interview: {
      interview_name: "Interview TA",
      career: {
        job_id: localStorage.getItem("careerId"),
      },
    },
    ta: {
      user_id: "",
    },
    applicant: {
      user_id: localStorage.getItem("applicantId"),
      cv: {
        cv_id: localStorage.getItem("applicantId"),
      },
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8088/profile/ta")
      .then((response) => {
        setTa(response.data.result);
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
      [name]: name === "ta" ? { user_id: value } : value,
    }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let newInterviewUser = {
      interview_date: data.interview_date,
      link: data.link,
      interview: {
        interview_name: data.interview.interview_name,
        career: {
          job_id: data.interview.career.job_id,
        },
      },
      applicant: {
        user_id: data.applicant.user_id,
      },
      ta: {
        user_id: data.ta.user_id,
      },
      trainer: null,
      status: {
        status_id: data.status.status_id,
      },
    };

    axios
      .post(
        "http://localhost:8088/api/interviews",
        JSON.stringify(newInterviewUser),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="setinterview-container">
      <div id="setinterview-card">
        <form id="setinterview-form">
          <div>
            <h1>Set Interview TA</h1>
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
            <select name="ta" value={data.ta.user_id} onChange={handleChange}>
              <option value="" disabled>
                Select TA
              </option>
              {ta.map((t) => {
                return (
                  <option key={t.user.user_id} value={t.user.user_id}>
                    {t.name}
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
