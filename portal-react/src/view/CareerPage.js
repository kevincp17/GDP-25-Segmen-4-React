import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import { Link } from "react-router-dom";
import $ from "jquery";
import "../css/careers.css";
import axios from "axios";
import { viewCareers, createCareer } from "../features/viewCareersData";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import { MultiSelect } from "react-multi-select-component";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

export default function CareerPage() {
  let percentage = 0;
  const navigate = useNavigate();
  const date = new Date();
  const [careers, setCareers] = useState([]);
  const [dataJob, setDataJob] = useState({
    title: null,
    placement: null,
    description: null,
    requirement: null,
    type: null,
    start_post_date: date,
    picture: "gdp.jpg",
  });

  const [applyData, setApplyData] = useState([]);

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

  const [userName, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [skillList, setSkillList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);
  const [qualificationList, setQualificationList] = useState([]);
  const [qualificationOptions, setQualificationOptions] = useState([]);
  // const qualificationOptions = [
  //   { label: "Grapes 🍇", value: "grapes" },
  //   { label: "Mango 🥭", value: "mango" },
  //   { label: "Strawberry 🍓", value: "strawberry"},
  // ];
  console.log(qualificationList);
  const url = useSelector((state) => state.viewCareersData.url);
  const urlCV = useSelector((state) => state.viewProfileData.url);
  const urlProfile = useSelector((state) => state.viewProfileData.profileUrl);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/qualification")
      .then((response) => {
        console.log(response.data.result.length);
        let qualificationArr = [];
        for (let i = 0; i < response.data.result.length; i++) {
          qualificationArr.push({
            label: response.data.result[i].name,
            value: response.data.result[i].qualification_id,
          });
        }
        setQualificationOptions([...qualificationOptions, ...qualificationArr]);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url)
      .then((response) => {
        console.log(response.data.result);
        setCareers(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlCV + localStorage.getItem("userId") + "/skill")
      .then((response) => {
        setSkillList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlCV + localStorage.getItem("userId") + "/experience")
      .then((response) => {
        setExperienceList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlCV + localStorage.getItem("userId") + "/education")
      .then((response) => {
        setEducationList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlCV + localStorage.getItem("userId") + "/certificate")
      .then((response) => {
        setCertificationList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlProfile + localStorage.getItem("userId"))
      .then((response) => {
        setUserName(response.data.result.name);
        setPhone(response.data.result.phone);
        setAddress(response.data.result.address);
        setEmail(localStorage.getItem("email"));
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get("http://localhost:8088/api/apply/" + localStorage.getItem("userId"))
      .then((response) => {
        console.log(response.data.result);
        setApplyData(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
    setRefresh(false);
  }, [refresh]);

  if (userName && email && phone && address) {
    percentage = percentage + 20;
  }

  if (skillList.length != 0) {
    percentage = percentage + 20;
  }

  if (educationList.length != 0) {
    percentage = percentage + 20;
  }

  if (experienceList.length != 0) {
    percentage = percentage + 20;
  }

  if (certificationList.length != 0) {
    percentage = percentage + 20;
  }

  const handleOpen = (data) => {
    let datetime = new Date(data.start_post_date).getTime();
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
    setModalJobId(data.job_id);
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

  const columnCareerAdmin = [
    {
      name: "Job Name",
      selector: (row) => row.title,
      sortable: true,
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
        let dateStart = new Date(row.start_post_date);
        var dayStart = dateStart.getDate();
        var monthStart = dateStart.getMonth();
        var yearStart = dateStart.getFullYear();
        return dayStart + " " + months[monthStart] + " " + yearStart;
      },
      sortable: true,
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

            <button id="btn-job-detail" onClick={() => handleOpen(row)}>
              <FaMagnifyingGlass />
            </button>
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
                        {modalPlace} &#x2022; {modalType} Employment &#x2022;
                        Posted {info}
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
      },
    },
  ];

  let handleChange = (e) => {
    const { name, value } = e.target;
    setDataJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataJob);
    console.log(qualificationList);
    axios
      .post(url, JSON.stringify(dataJob), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.result);
        let dataQualificationJob = {};
        for (let i = 0; i < qualificationList.length; i++) {
          dataQualificationJob = {
            qualification: {
              qualification_id: qualificationList[i].value,
            },
            career: {
              job_id: response.data.result.job_id,
            },
          };
          console.log(dataQualificationJob);
          axios.post(
            "http://localhost:8088/api/qualification_job",
            JSON.stringify(dataQualificationJob),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

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
  };

  const handleApplyConfirm = (career) => {
    let careerApplied = applyData.some((a) => a.career.title == career.title);

    let results = applyData.filter(
      (data) => data.career.title === career.title
    );
    console.log(careerApplied);
    console.log(results);

    if (
      percentage <= 60 &&
      (skillList.length == 0 || educationList.length == 0)
    ) {
      swal({
        title: `Your CV is incomplete, filled it in first`,
        buttons: {
          apply: {
            text: `PROFILE`,
            value: "apply",
          },
          cancelApply: {
            text: `CANCEL`,
            value: "cancel-apply",
          },
        },
        icon: "warning",
      }).then((value) => {
        switch (value) {
          case "apply":
            navigate("/profile");
            break;
          case "cancel-apply":
            break;
          default:
            break;
        }
      });
    } else if (careerApplied && results.length != 0) {
      console.log(results[results.length - 1].date);
      let applyDate = new Date(results[results.length - 1].date);
      let cooldownDate = new Date(applyDate.setMonth(applyDate.getMonth() + 6));
      console.log(new Date());
      console.log(cooldownDate);

      if (
        results[results.length - 1].status.name != "Rejected" &&
        results[results.length - 1].status.name != "Accepted"
      ) {
        swal({
          title: `You've already applied this position. Wait for the result.`,
          buttons: {
            cancelApply: {
              text: `CANCEL`,
              value: "cancel-apply",
            },
          },
          icon: "info",
        }).then((value) => {
          switch (value) {
            case "cancel-apply":
              break;
            default:
              break;
          }
        });
      } else if (
        results[results.length - 1].status.name == "Rejected" &&
        new Date(results[results.length - 1].cooldown_date) > new Date()
      ) {
        swal({
          title: `You've been rejected for this position. Please wait for 6 months.`,
          buttons: {
            cancelApply: {
              text: `CANCEL`,
              value: "cancel-apply",
            },
          },
          icon: "info",
        }).then((value) => {
          switch (value) {
            case "cancel-apply":
              break;
            default:
              break;
          }
        });
      } else if (
        results[results.length - 1].status.name == "Rejected" &&
        new Date(results[results.length - 1].cooldown_date) <= new Date()
      ) {
        swal({
          title: `You will apply as a ${career.title}. Do you want to continue?`,
          buttons: {
            apply: {
              text: `APPLY`,
              value: "apply",
            },
            cancelApply: {
              text: `CANCEL`,
              value: "cancel-apply",
            },
          },
          icon: "warning",
        }).then((value) => {
          switch (value) {
            case "apply":
              swal({
                title: `You apply as a ${career.title} successfully.`,
                buttons: {
                  OK: {
                    text: `OK`,
                  },
                },
                icon: "success",
              });

              let dataApply = {
                status: {
                  status_id: 1,
                },
                date: date,
                career: {
                  job_id: career.job_id,
                },
                applicant: {
                  user_id: localStorage.getItem("userId"),
                },
                cv: {
                  cv_id: localStorage.getItem("userId"),
                },
              };

              axios
                .post(
                  "http://localhost:8088/api/apply",
                  JSON.stringify(dataApply),
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((response) => {
                  setOpen(false);
                  navigate("/apply_job");
                })
                .catch((error) => {
                  console.log(error);
                  setOpen(false);
                });
              break;
            case "cancel-apply":
              break;
            default:
              break;
          }
        });
      } else if (results[results.length - 1].status.name == "Accepted") {
        swal({
          title: `You will apply as a ${career.title}. Do you want to continue?`,
          buttons: {
            apply: {
              text: `APPLY`,
              value: "apply",
            },
            cancelApply: {
              text: `CANCEL`,
              value: "cancel-apply",
            },
          },
          icon: "warning",
        }).then((value) => {
          switch (value) {
            case "apply":
              swal({
                title: `You apply as a ${career.title} successfully.`,
                buttons: {
                  OK: {
                    text: `OK`,
                  },
                },
                icon: "success",
              });

              let dataApply = {
                status: {
                  status_id: 1,
                },
                date: date,
                career: {
                  job_id: career.job_id,
                },
                applicant: {
                  user_id: localStorage.getItem("userId"),
                },
                cv: {
                  cv_id: localStorage.getItem("userId"),
                },
              };

              axios
                .post(
                  "http://localhost:8088/api/apply",
                  JSON.stringify(dataApply),
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((response) => {
                  setOpen(false);
                  navigate("/apply_job");
                })
                .catch((error) => {
                  console.log(error);
                  setOpen(false);
                });
              break;
            case "cancel-apply":
              break;
            default:
              break;
          }
        });
      }
    } else {
      swal({
        title: `You will apply as a ${career.title}. Do you want to continue?`,
        buttons: {
          apply: {
            text: `APPLY`,
            value: "apply",
          },
          cancelApply: {
            text: `CANCEL`,
            value: "cancel-apply",
          },
        },
        icon: "warning",
      }).then((value) => {
        switch (value) {
          case "apply":
            swal({
              title: `You apply as a ${career.title} successfully.`,
              buttons: {
                OK: {
                  text: `OK`,
                },
              },
              icon: "success",
            });

            let dataApply = {
              status: {
                status_id: 1,
              },
              date: date,
              career: {
                job_id: career.job_id,
              },
              applicant: {
                user_id: localStorage.getItem("userId"),
              },
              cv: {
                cv_id: localStorage.getItem("userId"),
              },
            };

            axios
              .post(
                "http://localhost:8088/api/apply",
                JSON.stringify(dataApply),
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                setOpen(false);
                navigate("/apply_job");
              })
              .catch((error) => {
                console.log(error);
                setOpen(false);
              });
            break;
          case "cancel-apply":
            break;
          default:
            break;
        }
      });
    }
  };

  const handleApply = (career) => {
    let dataApply = {
      status: {
        status_id: 1,
      },
      date: date,
      career: {
        job_id: career.job_id,
      },
      applicant: {
        user_id: localStorage.getItem("userId"),
      },
    };

    axios
      .post("http://localhost:8088/api/apply", JSON.stringify(dataApply), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setOpen(false);
        navigate("/main/apply_job");
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
      });
  };

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

  const customStyle = {
    table: {
      style: {
        borderRadius: "10px",
      },
    },
  };

  return (
    <div
      id={
        localStorage.getItem("role") === "Admin" ||
        localStorage.getItem("role") === "TA" ||
        localStorage.getItem("role") === "Trainer"
          ? "careers-div-adm"
          : "careers-div"
      }
    >
      {localStorage.getItem("role") === "Admin" ||
      localStorage.getItem("role") === "TA" ||
      localStorage.getItem("role") === "Trainer" ? (
        <div id="career-table-adm">
          {/* <div id="bread-crumbs">
            <p><Link style={{textDecoration:'none'}} to="/">Home</Link></p>
            <p>{" >Careers> "}</p>
            <p>
              {" View " +
                window.location.pathname.charAt(1).toUpperCase() +
                window.location.pathname.slice(2)}
            </p>
          </div> */}

          <div style={{ display: "flex", width: "100%" }}>
            {localStorage.getItem("role") === "TA" ? (
              <button id="add-job-btn" onClick={() => handleOpenAddJob()}>
                <FaPlus />
              </button>
            ) : null}
            <h1 style={{ marginLeft: "200px" }}>Job Vacancy List</h1>
          </div>

          <DataTable
            className="rdt_Table"
            columns={columnCareerAdmin}
            data={careers}
            customStyles={customStyle}
            pagination
            fixedHeader
          />
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
                    <label for="title">Job Title</label>
                    <input
                      id="title"
                      name="title"
                      value={dataJob.title}
                      onChange={handleChange}
                      placeholder="Masukkan nama lowongan"
                    />
                  </div>

                  <div>
                    <label for="placement">Placement</label>
                    <input
                      id="placement"
                      name="placement"
                      value={dataJob.placement}
                      onChange={handleChange}
                      placeholder="Masukkan penempatan lowongan"
                    />
                  </div>

                  <div>
                    <label for="type">Job Employment</label>
                    <select id="type" name="type" onChange={handleChange}>
                      <option selected>Job Employment</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label for="type">Job Qualifications</label>
                    <div style={{ width: "640px", marginLeft: "30px" }}>
                      <MultiSelect
                        id="multi-sel"
                        options={qualificationOptions}
                        value={qualificationList}
                        onChange={setQualificationList}
                        labelledBy="Select Job Qualifications"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="description">Job Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={dataJob.description}
                      onChange={handleChange}
                      placeholder="Masukkan deskripsi lowongan"
                    />
                  </div>

                  <div>
                    <label for="requirement">Job Requirement</label>
                    <textarea
                      id="requirement"
                      name="requirement"
                      value={dataJob.requirement}
                      onChange={handleChange}
                      placeholder="Masukkan persyaratan lowongan"
                    />
                  </div>
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
      ) : (
        <>
          <div id="careers-div1"></div>

          <div id="inside-div">
            <p>JOIN US!</p>
            <p>Find And Apply For Your Suitable Career</p>
            <p>
              Our company thrives due to the talents and diverse perspectives of
              our diverse team, which is why we are an equal opportunity
              employer. Let us know who you are.
            </p>
          </div>

          <div id="search-div">
            {localStorage.getItem("role") === "TA" ? (
              <button id="add-job-btn" onClick={() => handleOpenAddJob()}>
                ADD JOB VACANCY
              </button>
            ) : null}

            <input
              id="search-input"
              style={
                localStorage.getItem("role") !== "TA"
                  ? { marginLeft: "180px" }
                  : null
              }
              placeholder="Kata Kunci Pencarian"
            ></input>
            <SearchIcon className="search-icon" />

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
                      <label for="title">Job Title</label>
                      <input
                        id="title"
                        name="title"
                        value={dataJob.title}
                        onChange={handleChange}
                        placeholder="Masukkan nama lowongan"
                      />
                    </div>

                    <div>
                      <label for="placement">Placement</label>
                      <input
                        id="placement"
                        name="placement"
                        value={dataJob.placement}
                        onChange={handleChange}
                        placeholder="Masukkan penempatan lowongan"
                      />
                    </div>

                    <div>
                      <label for="type">Job Employment</label>
                      <select id="type" name="type" onChange={handleChange}>
                        <option selected>Job Employment</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>

                    <div>
                      <label for="type">Job Qualifications</label>
                      <div style={{ width: "640px", marginLeft: "30px" }}>
                        <MultiSelect
                          id="multi-sel"
                          options={qualificationOptions}
                          value={qualificationList}
                          onChange={setQualificationList}
                          labelledBy="Select Job Qualifications"
                        />
                      </div>
                    </div>

                    <div>
                      <label for="description">Job Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={dataJob.description}
                        onChange={handleChange}
                        placeholder="Masukkan deskripsi lowongan"
                      />
                    </div>

                    <div>
                      <label for="requirement">Job Requirement</label>
                      <textarea
                        id="requirement"
                        name="requirement"
                        value={dataJob.requirement}
                        onChange={handleChange}
                        placeholder="Masukkan persyaratan lowongan"
                      />
                    </div>
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
                <div id="job-data">
                  <img src={"/image/gdp.jpg"} />
                  <p id="job-date">
                    {dayStart + " " + months[monthStart] + " " + yearStart}
                  </p>
                  <p id="job-title">{career.title}</p>
                  <p id="job-type">{career.type}</p>
                  <div id="cd2-btndiv">
                    {localStorage.getItem("role") === "Applicant" ? (
                      <button onClick={() => handleApplyConfirm(career)}>
                        APPLY
                      </button>
                    ) : null}
                    <button onClick={() => handleOpen(career)}>DETAIL</button>
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
                      {modalPlace} &#x2022; {modalType} Employment &#x2022;
                      Posted {info}
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
        </>
      )}
    </div>
  );
}
