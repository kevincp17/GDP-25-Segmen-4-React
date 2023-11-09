import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import $ from "jquery";
import "../css/careers.css";
import axios from "axios";
import { viewCareers, createCareer } from "../features/viewCareersData";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate, useNavigate } from "react-router-dom";

export default function CareerPage() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  // console.log(year+"-"+month+"-"+day);
  const [careers, setCareers] = useState([]);
  console.log(careers);

  const [dataJob, setDataJob] = useState({
    title: null,
    placement: null,
    description: null,
    requirement: null,
    type: null,
    start_post_date: date,
    picture: "gdp.jpg",
  });

  console.log(dataJob);

  const [open, setOpen] = useState(false);
  const [openAddJob, setOpenAddJob] = useState(false);

  const [modalTitle, setModalTitle] = useState();
  const [info, setInfo] = useState();
  const [modalJobId, setModalJobId] = useState();
  const [modalDesc, setModalDesc] = useState();
  const [modalReq, setModalReq] = useState();
  const [modalPlace, setModalPlace] = useState();
  const [modalType, setModalType] = useState();

  const [refresh, setRefresh] = useState(false);
  const handleOpen = (data) => {
    let datetime = new Date(data.start_post_date).getTime();
    console.log(datetime);
    let now = new Date().getTime();
    let milisec_diff = 0;
    if (datetime < now) {
      milisec_diff = now - datetime;
    } else {
      milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    if (days > 30) {
      if (Math.floor(days / 30) > 1) {
        setInfo(Math.floor(days / 30) + " months ago");
      } else {
        setInfo(Math.floor(days / 30) + " month ago");
      }
    } else if (days < 30) {
      if (days > 7) {
        if (Math.floor(days / 7) > 1) {
          setInfo(Math.floor(days / 7) + " weeks ago");
        } else {
          setInfo(Math.floor(days / 7) + " week ago");
        }
      } else {
        if (days > 1) {
          setInfo(days + " days ago");
        } else if (days == 1) {
          setInfo(days + " day ago");
        } else {
          setInfo(" today");
        }
      }
    }
    console.log(data);
    setModalJobId(data.job_id)
    setModalTitle(data.title);
    setModalDesc(data.description);
    setModalReq(data.requirement);
    setModalPlace(data.placement);
    setModalType(data.type);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpenAddJob = () => setOpenAddJob(true);

  const handleCloseAddJob = () => setOpenAddJob(false);

  let handleChange = (e) => {
    const { name, value } = e.target;
    setDataJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // let handleChangeFile = (e) => {
  //   console.log(e.target.files[0].name);
  //   setDataJob((prevState) => ({
  //     ...prevState,
  //     picture: e.target.files[0],
  //   }));
  // };

  const handleSubmit = (e) => {
    // console.log(dataJob.picture);
    // console.log(dataJob.picture.name);
    e.preventDefault();
    // const urlImage = process.env.PUBLIC_URL + '/image';
    // console.log(urlImage);
    // dispatch(createCareer(JSON.stringify(dataJob)))
    axios
      .post(url, JSON.stringify(dataJob), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDataJob({
          title: null,
          placement: null,
          description: null,
          requirement: null,
          type: null,
          start_post_date: date,
        });

        setRefresh(true);
        setOpenAddJob(false);
      })
      .catch((error) => {
        console.log(error);
        setDataJob({
          title: null,
          placement: null,
          description: null,
          requirement: null,
          type: null,
          start_post_date: date,
        });
        setOpenAddJob(false);
      });

    //   const formData = new FormData();
    //   formData.append('file', dataJob.picture);
    //   formData.append('fileName', dataJob.picture.name);

    //   const config = {
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //   };

    //   axios.post(urlImage, formData);
    //   console.log(formData);
  };

  const handleApply = () => {
    let dataApply = {
      status: "Waiting",
      date: date,
      career: {
        job_id: modalJobId,
      },
      applicant: {
        user_id: localStorage.getItem("userId"),
      },
    };
    console.log(dataApply);

    axios
      .post("http://localhost:8088/api/apply", JSON.stringify(dataApply), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setOpen(false);
        navigate("/main/apply_job")
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
      });
  };

  console.log(careers);

  const url = useSelector((state) => state.viewCareersData.url);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setCareers(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    setRefresh(false);
  }, [refresh]);

  // $(document).ready(function () {
  $("#select-input").change(function () {
    var selectValue = $(this).val().toLowerCase();
    $("#careers-div2 #job-data").filter(function () {
      return $(this).toggle(
        $(this).text().toLowerCase().indexOf(selectValue) > -1
      );
    });
  });

  $("#search-input").on("keyup", function () {
    var searchvalue = $(this).val().toLowerCase();
    $("#careers-div2 #job-data").filter(function () {
      return $(this).toggle(
        $(this).text().toLowerCase().indexOf(searchvalue) > -1
      );
    });
  });
  // });

  const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
    border: "1px solid #EEEEEE",
    borderTop: "3px solid #93C953",
    borderRadius: "10px",
  };
  return (
    <div id="careers-div">
      <div id="careers-div1"></div>

      <div id="inside-div">
        <p>JOIN US!</p>
        <p>Find And Apply For Your Suitable Career</p>
        <p>
          Our company thrives due to the talents and diverse perspectives of our
          diverse team, which is why we are an equal opportunity employer. Let
          us know who you are.
        </p>
      </div>

      <div id="search-div">
        <select id="select-input">
          <option value="" selected>
            Job Type
          </option>
          <option value="Full Time">Full Time</option>
          <option value="Contract">Contract</option>
        </select>
        <input id="search-input" placeholder="Kata Kunci Pencarian"></input>
        <SearchIcon className="search-icon" />

        {localStorage.getItem("role") === "TA" ? (
          <button id="add-job-btn" onClick={() => handleOpenAddJob()}>
            ADD JOB VACANCY
          </button>
        ) : null}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openAddJob}
          onClose={handleCloseAddJob}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openAddJob}>
            <div class="modal">
              <div class="modal-header">
                <div>
                  <p id="modal-title-form-add" class="modal-title">
                    Add Job Vacancy
                  </p>
                </div>

                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseAddJob}
                >
                  <CloseIcon />
                </button>
              </div>
              <div class="modal-body" id="modal-body-add-job">
                <div>
                  <input
                    name="title"
                    value={dataJob.title}
                    onChange={handleChange}
                    placeholder="Masukkan nama lowongan"
                  />
                </div>

                <div>
                  <input
                    name="placement"
                    value={dataJob.placement}
                    onChange={handleChange}
                    placeholder="Masukkan penempatan lowongan"
                  />
                </div>

                <div>
                  <select name="type" onChange={handleChange}>
                    <option selected>Job Employment</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="description"
                    value={dataJob.description}
                    onChange={handleChange}
                    placeholder="Masukkan deskripsi lowongan"
                  />
                </div>

                <div>
                  <textarea
                    name="requirement"
                    value={dataJob.requirement}
                    onChange={handleChange}
                    placeholder="Masukkan persyaratan lowongan"
                  />
                </div>

                {/* <div hidden>
                  <input
                    id="file-input"
                    type="file"
                    name="picture"
                    onChange={handleChangeFile}
                    placeholder="Masukkan penempatan lowongan"
                  />
                 
                </div> */}
              </div>
              <div class="modal-footer">
                <button type="button" id="apply-btn" onClick={handleSubmit}>
                  SUBMIT
                </button>
                <button
                  type="button"
                  id="close-btn"
                  data-bs-dismiss="modal"
                  onClick={handleCloseAddJob}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>

      <div id="careers-div2">
        {careers.map((career) => {
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
          let dateStart = new Date(career.start_post_date);
          var dayStart = dateStart.getDate();
          var monthStart = dateStart.getMonth();
          var yearStart = dateStart.getFullYear();
          return (
            <div id="job-data" onClick={() => handleOpen(career)}>
              <img src={"/image/" + career.picture} />
              <p id="job-date">
                {dayStart + " " + months[monthStart] + " " + yearStart}
              </p>
              <p id="job-title">{career.title}</p>
              <p id="job-type">{career.type}</p>
              <div id="cd2-btndiv">
                <button>LEARN MORE</button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div class="modal">
            <div class="modal-header">
              <div>
                <p id="modal-title" class="modal-title">
                  {modalTitle}
                </p>
                <p id="info" class="modal-title">
                  {modalPlace} &#x2022; {modalType} Employment &#x2022; Posted{" "}
                  {info}
                </p>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <CloseIcon />
              </button>
            </div>
            <div class="modal-body">
              <p id="modal-desc">{modalDesc}</p>

              <div>
                <p>Perks and Benefit:</p>

                <ul>
                  <li>Life Insurance</li>
                  <li>Maternity/Paternity Leave</li>
                  <li>Health Insurance</li>
                  <li>Medical, Prescription, Dental, or Vision Plans</li>
                </ul>
              </div>

              <div>
                <p>Minimum Requirement:</p>

                <div id="modal-req">{modalReq}</div>
              </div>
            </div>
            <div class="modal-footer">
              {localStorage.getItem("role") === "Applicant" ? (
                <button type="button" id="apply-btn" onClick={handleApply}>
                  APPLY
                </button>
              ) : null}

              <button
                type="button"
                id="close-btn"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
