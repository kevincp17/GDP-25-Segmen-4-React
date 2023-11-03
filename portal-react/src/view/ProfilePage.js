import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../css/profile.css";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EditIcon from '@mui/icons-material/Edit';

export default function ProfilePage() {
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

  useEffect(() => {
    axios
      .get(url + "/1/skill")
      .then((response) => {
        setSkillList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url + "/1/experience")
      .then((response) => {
        console.log(response.data.result);
        setExperienceList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url + "/1/education")
      .then((response) => {
        console.log(response.data.result);
        setEducationList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get(url + "/1/certificate")
      .then((response) => {
        console.log(response.data.result);
        setCertificationList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  }, [refresh]);

  return (
    <div id="profile-div">
      <div id="profile-div1">
        <button>
          <img src="image/profile.png" />
        </button>

        <div id="profile-div1-info">
          <p>Kevin Christy Parinussa</p>
          <p>085847394002</p>
          <p>Jl. Kesehatan 8</p>
        </div>

        <div id="profile-div1-edit">
          <button>
            <EditIcon/>
          </button>
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
              <SettingsIcon className="skill-icon"/>
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
              <WorkIcon className="exp-icon"/>
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
              <SchoolIcon className="edu-icon"/>
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
              <WorkspacePremiumIcon className="cert-icon"/>
              Certification
            </button>
          </div>
        </div>
      </div>

      <div class="tab-content" id="nav-tabContent">
        {skill ? (
          <div id="nav-skill">
            <div id="nav-skill-div">
              {skillList.map((s) => {
                return (
                  <div id="nav-skill-content">
                    <img src={"/image/" + s.skill.picture} />
                    {s.skill.name}
                  </div>
                );
              })}
            </div>
          </div>
        ) : experience ? (
          <div id="nav-exp">
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
                );
              })}
            </div>
          </div>
        ) : education ? (
          <div id="nav-edu">
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
                );
              })}
            </div>
          </div>
        ) : certification ? (
          <div id="nav-cert">
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
                    <p>{c.certification.certification_name.toUpperCase()}</p>
                    <p>{c.certification.certification_name}</p>
                    <p>
                      Issued{" "}
                      {dayStart + " " + months[monthStart] + " " + yearStart}
                    </p>
                    <p>Credential ID {c.certification.certification_number}</p>
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
