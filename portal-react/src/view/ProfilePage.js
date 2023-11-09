import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../css/profile.css";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EditIcon from "@mui/icons-material/Edit";
import { viewUserProfile } from "../features/viewProfileData";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";

export default function ProfilePage() {
  const [userDataProfile, setUserDataProfile] = useState({
    cv_id: localStorage.getItem("userId"),
    name: null,
    phone: null,
    address: null,
    photo: null,
    user: {
      user_id: null,
    },
  });

  const [skillSelect, setSkillSelect] = useState([]);
  const [skillInput, setSkillInput] = useState({
    skill: {
      skill_id: null,
    },
    cv: {
      cv_id: null,
    },
  });

  const [expInput, setExpInput] = useState({
    exp_id: null,
    company_name: null,
    job_title: null,
    job_desc: null,
    start_date: null,
    end_date: null,
  });

  const [majorSelect, setMajorSelect] = useState([]);
  const [degreeSelect, setDegreeSelect] = useState([]);
  const [instituteSelect, setInstituteSelect] = useState([]);
  const [eduInput, setEduInput] = useState({
    edu_id: null,
    start_date: null,
    end_date: null,
    gpa: null,
    institute_name: null,
    degree_name: null,
    major_name: null,
  });

  const [certInput, setCertInput] = useState({
    certification_id: null,
    certification_name: null,
    certification_number: null,
    organizer_name: null,
    issued_date: null,
  });

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const [openAddSkill, setOpenAddSkill] = useState(false);
  const handleOpenAddSkill = () => setOpenAddSkill(true);
  const handleCloseAddSkill = () => setOpenAddSkill(false);

  const [openAddExperience, setOpenAddExperience] = useState(false);
  const handleOpenAddExperience = (exp) => {
    console.log(exp);
    if (exp) {
      let monthStartFormat;
      let monthEndFormat;

      let dateStart = new Date(exp.start_date);
      var dayStart = dateStart.getDate();
      var monthStart = dateStart.getMonth() + 1;
      var yearStart = dateStart.getFullYear();

      if (monthStart > 9) {
        monthStartFormat = monthStart;
      } else if (monthStart < 10) {
        monthStartFormat = "0" + monthStart;
      }

      if (dayStart < 10) {
        dayStart = "0" + dayStart;
      }

      let dateEnd = new Date(exp.end_date);
      var dayEnd = dateEnd.getDate();
      var monthEnd = dateEnd.getMonth() + 1;
      var yearEnd = dateEnd.getFullYear();

      if (monthEnd >= 10) {
        monthEndFormat = monthEnd;
      } else if (monthEnd < 10) {
        monthEndFormat = "0" + monthEnd;
      }

      if (dayEnd < 10) {
        dayEnd = "0" + dayEnd;
      }
      console.log(yearEnd + "-" + monthEndFormat + "-" + dayEnd);
      setExpInput({
        exp_id: exp.exp_id,
        company_name: exp.company_name,
        job_title: exp.job_title,
        job_desc: exp.job_desc,
        start_date: yearStart + "-" + monthStartFormat + "-" + dayStart,
        end_date: yearEnd + "-" + monthEndFormat + "-" + dayEnd,
      });
    }
    setOpenAddExperience(true);
  };
  const handleCloseAddExperience = () => {
    setExpInput({
      exp_id: null,
      company_name: null,
      job_title: null,
      job_desc: null,
      start_date: null,
      end_date: null,
    });
    setOpenAddExperience(false);
  };

  const [openAddEducation, setOpenAddEducation] = useState(false);
  const handleOpenAddEducation = (edu) => {
    console.log(edu);
    if (edu) {
      let monthStartFormat;
      let monthEndFormat;

      let dateStart = new Date(edu.education.start_date);
      var dayStart = dateStart.getDate();
      var monthStart = dateStart.getMonth() + 1;
      var yearStart = dateStart.getFullYear();

      if (monthStart > 9) {
        monthStartFormat = monthStart;
      } else if (monthStart < 10) {
        monthStartFormat = "0" + monthStart;
      }

      if (dayStart < 10) {
        dayStart = "0" + dayStart;
      }

      let dateEnd = new Date(edu.education.end_date);
      var dayEnd = dateEnd.getDate();
      var monthEnd = dateEnd.getMonth() + 1;
      var yearEnd = dateEnd.getFullYear();

      if (monthEnd >= 10) {
        monthEndFormat = monthEnd;
      } else if (monthEnd < 10) {
        monthEndFormat = "0" + monthEnd;
      }

      if (dayEnd < 10) {
        dayEnd = "0" + dayEnd;
      }
      setEduInput({
        edu_id: edu.education.edu_id,
        start_date: yearStart + "-" + monthStartFormat + "-" + dayStart,
        end_date: yearEnd + "-" + monthEndFormat + "-" + dayEnd,
        gpa: edu.education.gpa,
        institute_name: edu.education.institute.institute_id,
        degree_name: edu.education.degree.degree_id,
        major_name: edu.education.major.major_id,
      });
    }
    setOpenAddEducation(true);
  };
  const handleCloseAddEducation = () => {
    setEduInput({
      edu_id: null,
      start_date: null,
      end_date: null,
      gpa: null,
      institute_name: null,
      degree_name: null,
      major_name: null,
    });
    setOpenAddEducation(false);
  };

  const [openAddCertification, setOpenAddCertification] = useState(false);
  const handleOpenAddCertification = (cert) => {
    console.log(cert);
    if (cert) {
      let issuedMonthFormat;

      let dateIssued = new Date(cert.issued_date);
      var dayIssued = dateIssued.getDate();
      var monthIssued = dateIssued.getMonth() + 1;
      var yearIssued = dateIssued.getFullYear();

      if (monthIssued > 9) {
        issuedMonthFormat = monthIssued;
      } else if (monthIssued < 10) {
        issuedMonthFormat = "0" + monthIssued;
      }

      if (dayIssued < 10) {
        dayIssued = "0" + dayIssued;
      }

      setCertInput({
        certification_id: cert.certification_id,
        certification_name: cert.certification_name,
        certification_number: cert.certification_number,
        organizer_name: cert.organizer_name,
        issued_date: yearIssued + "-" + issuedMonthFormat + "-" + dayIssued,
      });
    }
    setOpenAddCertification(true);
  };
  const handleCloseAddCertification = () => {
    setCertInput({
      certification_id: null,
      certification_name: null,
      certification_number: null,
      organizer_name: null,
      issued_date: null,
    });
    setOpenAddCertification(false);
  };

  const [userName, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [cvID, setCVID] = useState();

  const [skill, setSkill] = useState(true);
  const [experience, setExperience] = useState(false);
  const [education, setEducation] = useState(false);
  const [certification, setCertification] = useState(false);

  const [skillList, setSkillList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const url = useSelector((state) => state.viewProfileData.url);
  const urlProfile = useSelector((state) => state.viewProfileData.profileUrl);
  const urlSkills = useSelector((state) => state.viewSkills.url);

  const urlMajor = useSelector((state) => state.viewEduProp.urlMajor);
  const urlDegree = useSelector((state) => state.viewEduProp.urlDegree);
  const urlInstitute = useSelector((state) => state.viewEduProp.urlInstitute);

  useEffect(() => {
    axios
      .get(urlSkills)
      .then((response) => {
        setSkillSelect(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlMajor)
      .then((response) => {
        setMajorSelect(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlDegree)
      .then((response) => {
        setDegreeSelect(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlInstitute)
      .then((response) => {
        setInstituteSelect(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url + localStorage.getItem("userId") + "/skill")
      .then((response) => {
        setSkillList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url + localStorage.getItem("userId") + "/experience")
      .then((response) => {
        console.log(response.data.result);
        setExperienceList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url + localStorage.getItem("userId") + "/education")
      .then((response) => {
        console.log(response.data.result);
        setEducationList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url + localStorage.getItem("userId") + "/certificate")
      .then((response) => {
        console.log(response.data.result);
        setCertificationList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(urlProfile + localStorage.getItem("userId"))
      .then((response) => {
        console.log(response.data.result);
        setUserName(response.data.result.name);
        setPhone(response.data.result.phone);
        setAddress(response.data.result.address);
        setEmail(response.data.result.user.email);
        setCVID(response.data.result.cv_id);

        setUserDataProfile({
          cv_id: localStorage.getItem("userId"),
          name: response.data.result.name,
          phone: response.data.result.phone,
          address: response.data.result.address,
          photo: null,
          user: {
            user_id: localStorage.getItem("userId"),
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
    setRefresh(false);
  }, [refresh]);

  let handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserDataProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let handleSkillInput = (e) => {
    const { name, value } = e.target;
    setSkillInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    let skillData = {
      skill: {
        skill_id: skillInput.skill_id,
      },
      cv: {
        cv_id: localStorage.getItem("userId"),
      },
    };
    console.log(skillData);
    axios
      .post(
        url + localStorage.getItem("userId") + "/skill",
        JSON.stringify(skillData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
        setOpenAddSkill(false);
      })
      .catch((error) => {
        console.log(error);
        setOpenAddSkill(false);
      });
  };

  let handleExpInput = (e) => {
    const { name, value } = e.target;
    setExpInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddExp = () => {
    console.log(expInput);
    let expData = {
      exp_id: expInput.exp_id,
      company_name: expInput.company_name,
      job_title: expInput.job_title,
      job_desc: expInput.job_desc,
      start_date: expInput.start_date,
      end_date: expInput.end_date,
    };

    console.log(expData);
    axios
      .post("http://localhost:8088/api/experience", JSON.stringify(expData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.result.exp_id);
        let cvExpData = {
          experience: {
            exp_id: response.data.result.exp_id,
          },
          cv: {
            cv_id: localStorage.getItem("userId"),
          },
        };

        axios
          .post(
            url + localStorage.getItem("userId") + "/experience",
            JSON.stringify(cvExpData),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            setExpInput({
              company_name: null,
              job_title: null,
              job_desc: null,
              start_date: null,
              end_date: null,
            });

            setRefresh(true);
            setOpenAddExperience(false);
          })
          .catch((error) => {
            console.log(error);
            setOpenAddExperience(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setOpenAddExperience(false);
      });
  };

  let handleEduInput = (e) => {
    const { name, value } = e.target;
    setEduInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEdu = () => {
    console.log(eduInput);
    let eduData = {
      start_date: eduInput.start_date,
      end_date: eduInput.end_date,
      gpa: eduInput.gpa,
      institute: {
        institute_id: eduInput.institute_name,
      },
      degree: {
        degree_id: eduInput.degree_name,
      },
      major: {
        major_id: eduInput.major_name,
      },
    };

    // console.log(expData);
    axios
      .post("http://localhost:8088/api/education", JSON.stringify(eduData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        let cvEduData = {
          education: {
            edu_id: response.data.result.edu_id,
          },
          cv: {
            cv_id: localStorage.getItem("userId"),
          },
        };

        axios
          .post(
            url + localStorage.getItem("userId") + "/education",
            JSON.stringify(cvEduData),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            setEduInput({
              start_date: null,
              end_date: null,
              gpa: null,
              institute_name: null,
              degree_name: null,
              major_name: null,
            });

            setRefresh(true);
            setOpenAddEducation(false);
          })
          .catch((error) => {
            console.log(error);
            setOpenAddEducation(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setOpenAddEducation(false);
      });
  };

  let handleCertInput = (e) => {
    const { name, value } = e.target;
    setCertInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCert = () => {
    console.log(certInput);
    let certData = {
      certification_name: certInput.certification_name,
      certification_number: certInput.certification_number,
      organizer_name: certInput.organizer_name,
      issued_date: certInput.issued_date,
    };

    console.log(certData);
    axios
      .post(
        "http://localhost:8088/api/certification",
        JSON.stringify(certData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.result.certification_id);
        let cvCertData = {
          certification: {
            certification_id: response.data.result.certification_id,
          },
          cv: {
            cv_id: localStorage.getItem("userId"),
          },
        };

        axios
          .post(
            url + localStorage.getItem("userId") + "/certificate",
            JSON.stringify(cvCertData),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            setCertInput({
              certification_name: null,
              certification_number: null,
              organizer_name: null,
              issued_date: null,
            });

            setRefresh(true);
            setOpenAddCertification(false);
          })
          .catch((error) => {
            console.log(error);
            setOpenAddCertification(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setOpenAddCertification(false);
      });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    let dataProfile = {
      cv_id: cvID,
      name: userDataProfile.name,
      phone: userDataProfile.phone,
      address: userDataProfile.address,
      photo: null,
      user: {
        user_id: cvID,
      },
    };
    console.log(dataProfile);

    axios
      .post(
        urlProfile + localStorage.getItem("userId"),
        JSON.stringify(dataProfile),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
        setOpenEditProfile(false);
      })
      .catch((error) => {
        console.log(error);
        setOpenEditProfile(false);
      });
  };

  const handleDeleteSkill = (skill_user) => {
    console.log(skill_user);
    let cvInfoSkill = {
      cv_info_id: skill_user.cv_info_id,
      skill: {
        skill_id: skill_user.skill.skill_id,
      },
      cv: {
        cv_id: skill_user.cv.cv_id,
      },
    };
    console.log(cvInfoSkill);
    axios
      .delete(
        "http://localhost:8088/api/cvinfo/" +
          skill_user.cv.cv_id +
          "/skill/" +
          skill_user.skill.skill_id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(cvInfoSkill),
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteExperience = (exp_user) => {
    console.log(exp_user);
    let cvInfoExp = {
      cv_info_id: exp_user.cv_info_id,
      experience: {
        exp_id: exp_user.experience.exp_id,
      },
      cv: {
        cv_id: exp_user.cv.cv_id,
      },
    };
    console.log(cvInfoExp);
    axios
      .delete(
        "http://localhost:8088/api/cvinfo/" +
          exp_user.cv.cv_id +
          "/experience/" +
          exp_user.experience.exp_id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(cvInfoExp),
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteEducation = (user_edu) => {
    console.log(user_edu);
    let cvInfoEdu = {
      cv_info_id: user_edu.cv_info_id,
      education: {
        edu_id: user_edu.education.edu_id,
      },
      cv: {
        cv_id: user_edu.cv.cv_id,
      },
    };
    console.log(cvInfoEdu);
    axios
      .delete(
        "http://localhost:8088/api/cvinfo/" +
          user_edu.cv.cv_id +
          "/education/" +
          user_edu.education.edu_id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(cvInfoEdu),
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCertification = (user_cert) => {
    console.log(user_cert);
    let cvInfoCert = {
      cv_info_id: user_cert.cv_info_id,
      certification: {
        certification_id: user_cert.certification.certification_id,
      },
      cv: {
        cv_id: user_cert.cv.cv_id,
      },
    };
    console.log(cvInfoCert);
    axios
      .delete(
        "http://localhost:8088/api/cvinfo/" +
          user_cert.cv.cv_id +
          "/certification/" +
          user_cert.certification.certification_id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(cvInfoCert),
        }
      )
      .then((response) => {
        console.log(response);
        setRefresh(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditExp = () => {
    console.log(expInput);
    let expData = {
      exp_id: expInput.exp_id,
      company_name: expInput.company_name,
      job_title: expInput.job_title,
      job_desc: expInput.job_desc,
      start_date: expInput.start_date,
      end_date: expInput.end_date,
    };
    console.log(expData);
    axios
      .post(
        "http://localhost:8088/api/experience/" + expInput.exp_id,
        JSON.stringify(expData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setExpInput({
          exp_id: null,
          company_name: null,
          job_title: null,
          job_desc: null,
          start_date: null,
          end_date: null,
        });
        setRefresh(true);
        setOpenAddExperience(false);
      })
      .catch((error) => {
        console.log(error);
        setOpenAddExperience(false);
      });
  };

  const handleEditEdu = () => {
    console.log(eduInput);
    let eduData = {
      edu_id: eduInput.edu_id,
      start_date: eduInput.start_date,
      end_date: eduInput.end_date,
      gpa: eduInput.gpa,
      institute: {
        institute_id: eduInput.institute_name,
      },
      degree: {
        degree_id: eduInput.degree_name,
      },
      major: {
        major_id: eduInput.major_name,
      },
    };
    console.log(eduData);
    axios
      .post(
        "http://localhost:8088/api/education/" + eduInput.edu_id,
        JSON.stringify(eduData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setEduInput({
          edu_id: null,
          start_date: null,
          end_date: null,
          gpa: null,
          institute_name: null,
          degree_name: null,
          major_name: null,
        });
        setRefresh(true);
        setOpenAddEducation(false);
      })
      .catch((error) => {
        console.log(error);
        setOpenAddEducation(false);
      });
  };

  const handleEditCert = () => {
    console.log(certInput);
    let certData = {
      certification_id: certInput.certification_id,
      certification_name: certInput.certification_name,
      certification_number: certInput.certification_number,
      organizer_name: certInput.organizer_name,
      issued_date: certInput.issued_date,
    };
    console.log(certData);
    axios
      .post(
        "http://localhost:8088/api/certification/" + certInput.certification_id,
        JSON.stringify(certData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCertInput({
          certification_id: null,
          certification_name: null,
          certification_number: null,
          organizer_name: null,
          issued_date: null,
        });
        setRefresh(true);
        setOpenAddCertification(false);
      })
      .catch((error) => {
        console.log(error);
        setOpenAddCertification(false);
      });
  };

  return (
    <div id="profile-div">
      <div id="profile-div1">
        <button>
          <img src="/image/profile.png" />
        </button>

        <div id="profile-div1-info">
          <p>
            <PersonIcon style={{ marginRight: "5px" }} />
            {userName}
          </p>
          <p>
            <LocalPhoneIcon style={{ marginRight: "5px" }} />
            {phone}
          </p>
          <p>
            <HomeIcon style={{ marginRight: "5px" }} />
            {address}
          </p>
          <p>
            <EmailIcon style={{ marginRight: "5px" }} />
            {email}
          </p>
        </div>

        <div id="profile-div1-edit">
          {localStorage.getItem("role") === "Applicant" ? (
            <button onClick={() => handleOpenEditProfile()}>
              <EditIcon />
            </button>
          ) : null}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openEditProfile}
            onClose={handleCloseEditProfile}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={openEditProfile}>
              <div class="modal">
                <div class="modal-header">
                  <div>
                    <p id="modal-title-form-add" class="modal-title">
                      Update your profile
                    </p>
                  </div>

                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseEditProfile}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div class="modal-body" id="modal-body-add-job">
                  <div>
                    <input
                      name="name"
                      value={userDataProfile.name}
                      onChange={handleProfileChange}
                      placeholder="Masukkan nama user baru"
                    />
                  </div>

                  <div>
                    <input
                      name="phone"
                      value={userDataProfile.phone}
                      onChange={handleProfileChange}
                      placeholder="Masukkan nomor telpon baru"
                    />
                  </div>

                  <div>
                    <input
                      name="address"
                      value={userDataProfile.address}
                      onChange={handleProfileChange}
                      placeholder="Masukkan alamat baru"
                    />
                  </div>

                  <div hidden>
                    <input
                      id="file-input"
                      type="file"
                      name="picture"
                      placeholder="Masukkan penempatan lowongan"
                    />
                    {/* <img style={{paddingLeft:'30px'}} src={URL.createObjectURL(dataJob.picture)} width={"200px"} height={"200px"}/> */}
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    id="apply-btn"
                    onClick={handleEditProfile}
                  >
                    SUBMIT
                  </button>
                  <button
                    type="button"
                    id="close-btn"
                    data-bs-dismiss="modal"
                    onClick={handleCloseEditProfile}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>

      <div id="profile-div2">
        <div>
          <div class="nav nav-tabs" id="nav-tab">
            <button
              id="nav-skill-tab"
              onClick={() => {
                setSkill(true);
                setExperience(false);
                setEducation(false);
                setCertification(false);
              }}
            >
              <SettingsIcon className="skill-icon" />
              Skill
            </button>
            <button
              id="nav-exp-tab"
              onClick={() => {
                setSkill(false);
                setExperience(true);
                setEducation(false);
                setCertification(false);
              }}
            >
              <WorkIcon className="exp-icon" />
              Experience
            </button>
            <button
              id="nav-edu-tab"
              onClick={() => {
                setSkill(false);
                setExperience(false);
                setEducation(true);
                setCertification(false);
              }}
            >
              <SchoolIcon className="edu-icon" />
              Education
            </button>
            <button
              id="nav-cert-tab"
              onClick={() => {
                setSkill(false);
                setExperience(false);
                setEducation(false);
                setCertification(true);
              }}
            >
              <WorkspacePremiumIcon className="cert-icon" />
              Certification
            </button>
          </div>
        </div>
      </div>

      <div class="tab-content" id="nav-tabContent">
        {skill ? (
          <div id="nav-skill">
            {localStorage.getItem("role") === "Applicant" ? (
              <button id="btn-add-skill" onClick={() => handleOpenAddSkill()}>
                ADD SKILL
              </button>
            ) : null}

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openAddSkill}
              onClose={handleCloseAddSkill}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={openAddSkill}>
                <div class="modal">
                  <div class="modal-header">
                    <div>
                      <p id="modal-title-form-add" class="modal-title">
                        Add your skill
                      </p>
                    </div>

                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCloseAddSkill}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div class="modal-body" id="modal-body-add-job">
                    <div>
                      <select name="skill_id" onChange={handleSkillInput}>
                        <option selected>Select Skill</option>
                        {skillSelect.map((skill) => {
                          return (
                            <option value={skill.skill_id}>{skill.name}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      id="apply-btn"
                      onClick={handleAddSkill}
                    >
                      SUBMIT
                    </button>
                    <button
                      type="button"
                      id="close-btn"
                      data-bs-dismiss="modal"
                      onClick={handleCloseAddSkill}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </Fade>
            </Modal>
            <div id="nav-skill-div">
              {skillList.map((s) => {
                return (
                  <div id="nav-skill-content">
                    <img src={"/image/" + s.skill.picture} />
                    <div>
                      <p>{s.skill.name}</p>
                    </div>

                    <button onClick={() => handleDeleteSkill(s)}>
                      <CloseIcon style={{ width: "20px" }} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : experience ? (
          <div id="nav-exp">
            {localStorage.getItem("role") === "Applicant" ? (
              <button
                id="btn-add-exp"
                onClick={() => handleOpenAddExperience()}
              >
                ADD EXPERIENCE
              </button>
            ) : null}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openAddExperience}
              onClose={handleCloseAddExperience}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={openAddExperience}>
                <div class="modal">
                  <div class="modal-header">
                    <div>
                      <p id="modal-title-form-add" class="modal-title">
                        Add your experience
                      </p>
                    </div>

                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCloseAddExperience}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div class="modal-body" id="modal-body-add-job">
                    <div>
                      <input
                        name="company_name"
                        value={expInput.company_name}
                        onChange={handleExpInput}
                        placeholder="Masukkan nama perusahaan"
                      />
                    </div>

                    <div>
                      <input
                        name="job_title"
                        value={expInput.job_title}
                        onChange={handleExpInput}
                        placeholder="Masukkan posisi"
                      />
                    </div>

                    <div>
                      <textarea
                        name="job_desc"
                        value={expInput.job_desc}
                        onChange={handleExpInput}
                        placeholder="Masukkan deskripsi pekerjaan"
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        name="start_date"
                        value={expInput.start_date}
                        onChange={handleExpInput}
                        placeholder="Masukkan tanggal awal bekerja"
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        name="end_date"
                        value={expInput.end_date}
                        onChange={handleExpInput}
                        placeholder="Masukkan tanggal akhir bekerja"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      id="apply-btn"
                      onClick={expInput.exp_id ? handleEditExp : handleAddExp}
                    >
                      SUBMIT
                    </button>
                    <button
                      type="button"
                      id="close-btn"
                      data-bs-dismiss="modal"
                      onClick={handleCloseAddExperience}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </Fade>
            </Modal>
            <div id="nav-exp-div">
              {experienceList.map((e) => {
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
                let dateStart = new Date(e.experience.start_date);
                console.log(e.experience.start_date);
                var dayStart = dateStart.getDate();
                var monthStart = dateStart.getMonth();
                var yearStart = dateStart.getFullYear();

                let dateEnd = new Date(e.experience.end_date);
                var dayEnd = dateEnd.getDate();
                var monthEnd = dateEnd.getMonth();
                var yearEnd = dateEnd.getFullYear();
                return (
                  <div id="nav-exp-content">
                    <div>
                      <p>{e.experience.job_title.toUpperCase()}</p>
                      <p>{e.experience.company_name}</p>
                      <p>
                        {dayStart +
                          " " +
                          months[monthStart] +
                          " " +
                          yearStart +
                          " - " +
                          dayEnd +
                          " " +
                          months[monthEnd] +
                          " " +
                          yearEnd}
                      </p>
                      <p>{e.experience.job_desc}</p>
                    </div>

                    <div>
                      <button
                        onClick={() => handleOpenAddExperience(e.experience)}
                      >
                        <EditIcon style={{ width: "20px" }} />
                      </button>

                      <button onClick={() => handleDeleteExperience(e)}>
                        <CloseIcon style={{ width: "20px" }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : education ? (
          <div id="nav-edu">
            {localStorage.getItem("role") === "Applicant" ? (
              <button id="btn-add-edu" onClick={() => handleOpenAddEducation()}>
                ADD EDUCATION
              </button>
            ) : null}

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openAddEducation}
              onClose={handleCloseAddEducation}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={openAddEducation}>
                <div class="modal">
                  <div class="modal-header">
                    <div>
                      <p id="modal-title-form-add" class="modal-title">
                        Add your education
                      </p>
                    </div>

                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCloseAddEducation}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div class="modal-body" id="modal-body-add-job">
                    <div>
                      <select name="institute_name" onChange={handleEduInput}>
                        <option>Select Institute</option>
                        {instituteSelect.map((institute) => {
                          return (
                            <option
                              value={institute.institute_id}
                              selected={
                                eduInput.institute_name ===
                                institute.institute_id
                                  ? true
                                  : false
                              }
                            >
                              {institute.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <select name="degree_name" onChange={handleEduInput}>
                        <option>Select Degree</option>
                        {degreeSelect.map((degree) => {
                          return (
                            <option
                              value={degree.degree_id}
                              selected={
                                eduInput.degree_name === degree.degree_id
                                  ? true
                                  : false
                              }
                            >
                              {degree.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <select name="major_name" onChange={handleEduInput}>
                        <option>Select Major</option>
                        {majorSelect.map((major) => {
                          return (
                            <option
                              value={major.major_id}
                              selected={
                                eduInput.major_name === major.major_id
                                  ? true
                                  : false
                              }
                            >
                              {major.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <input
                        name="gpa"
                        value={eduInput.gpa}
                        onChange={handleEduInput}
                        placeholder="GPA"
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        name="start_date"
                        value={eduInput.start_date}
                        onChange={handleEduInput}
                        placeholder="Masukkan tanggal awal belajar"
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        name="end_date"
                        value={eduInput.end_date}
                        onChange={handleEduInput}
                        placeholder="Masukkan tanggal akhir belajar"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      id="apply-btn"
                      onClick={eduInput.edu_id ? handleEditEdu : handleAddEdu}
                    >
                      SUBMIT
                    </button>
                    <button
                      type="button"
                      id="close-btn"
                      data-bs-dismiss="modal"
                      onClick={handleCloseAddEducation}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </Fade>
            </Modal>
            <div id="nav-edu-div">
              {educationList.map((ed) => {
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
                let dateStart = new Date(ed.education.start_date);
                var dayStart = dateStart.getDate();
                var monthStart = dateStart.getMonth();
                var yearStart = dateStart.getFullYear();

                let dateEnd = new Date(ed.education.end_date);
                var dayEnd = dateEnd.getDate();
                var monthEnd = dateEnd.getMonth();
                var yearEnd = dateEnd.getFullYear();
                return (
                  <div id="nav-edu-content">
                    <div>
                      <p>
                        {ed.education.degree.name.toUpperCase() +
                          " " +
                          ed.education.major.name.toUpperCase()}
                      </p>
                      <p>{ed.education.institute.name}</p>
                      <p>
                        {dayStart +
                          " " +
                          months[monthStart] +
                          " " +
                          yearStart +
                          " - " +
                          dayEnd +
                          " " +
                          months[monthEnd] +
                          " " +
                          yearEnd}
                      </p>
                      <p>GPA {ed.education.gpa}</p>
                    </div>

                    <div>
                      <button onClick={() => handleOpenAddEducation(ed)}>
                        <EditIcon style={{ width: "20px" }} />
                      </button>

                      <button onClick={() => handleDeleteEducation(ed)}>
                        <CloseIcon style={{ width: "20px" }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : certification ? (
          <div id="nav-cert">
            {localStorage.getItem("role") === "Applicant" ? (
              <button
                id="btn-add-cert"
                onClick={() => handleOpenAddCertification()}
              >
                ADD CERTIFICATION
              </button>
            ) : null}

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openAddCertification}
              onClose={handleCloseAddCertification}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={openAddCertification}>
                <div class="modal">
                  <div class="modal-header">
                    <div>
                      <p id="modal-title-form-add" class="modal-title">
                        Add your certification
                      </p>
                    </div>

                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCloseAddCertification}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div class="modal-body" id="modal-body-add-job">
                    <div>
                      <input
                        name="certification_name"
                        value={certInput.certification_name}
                        onChange={handleCertInput}
                        placeholder="Masukkan nama sertifikasi"
                      />
                    </div>

                    <div>
                      <input
                        name="certification_number"
                        value={certInput.certification_number}
                        onChange={handleCertInput}
                        placeholder="Masukkan nomor serial sertifikasi"
                      />
                    </div>

                    <div>
                      <input
                        name="organizer_name"
                        value={certInput.organizer_name}
                        onChange={handleCertInput}
                        placeholder="Masukkan nama organisasi penyelenggara"
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        name="issued_date"
                        value={certInput.issued_date}
                        onChange={handleCertInput}
                        placeholder="Masukkan tanggal acara dilaksanakan"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      id="apply-btn"
                      onClick={
                        certInput.certification_id
                          ? handleEditCert
                          : handleAddCert
                      }
                    >
                      SUBMIT
                    </button>
                    <button
                      type="button"
                      id="close-btn"
                      data-bs-dismiss="modal"
                      onClick={handleCloseAddCertification}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </Fade>
            </Modal>
            <div id="nav-cert-div">
              {certificationList.map((c) => {
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
                let dateStart = new Date(c.certification.issued_date);
                var dayStart = dateStart.getDate();
                var monthStart = dateStart.getMonth();
                var yearStart = dateStart.getFullYear();

                return (
                  <div id="nav-cert-content">
                    <div>
                      <p>{c.certification.certification_name.toUpperCase()}</p>
                      <p>{c.certification.certification_name}</p>
                      <p>
                        Issued{" "}
                        {dayStart + " " + months[monthStart] + " " + yearStart}
                      </p>
                      <p>
                        Credential ID {c.certification.certification_number}
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={() =>
                          handleOpenAddCertification(c.certification)
                        }
                      >
                        <EditIcon style={{ width: "20px" }} />
                      </button>

                      <button onClick={() => handleDeleteCertification(c)}>
                        <CloseIcon style={{ width: "20px" }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}