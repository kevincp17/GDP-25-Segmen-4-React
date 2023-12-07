import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryPie,
} from "victory";
import axios from "axios";
import "../css/home.css";

export default function HomePage() {
  console.log(localStorage.getItem("role"));
  console.log(localStorage.getItem("token"));
  const [careers, setCareers] = useState([]);
  const [applies, setApplies] = useState([]);
  const [interviewTAList, setInterviewTAList] = useState([]);
  const [interviewTrainerList, setInterviewTrainerList] = useState([]);

  const url = useSelector((state) => state.viewCareersData.url);
  const urlApply = useSelector((state) => state.application.url);

  let screeningcv = 0;
  let hrinterview = 0;
  let userinterview = 0;
  let offering = 0;
  let accepted = 0;
  let rejected = 0;

  const currentDate = new Date();
  let monthApplyArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  applies.map((ap) => {
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
    let date = new Date(ap.date);
    var month = date.getMonth();

    if (ap.status.name == "Screening CV") {
      screeningcv++;
    } else if (ap.status.name == "HR Interview") {
      hrinterview++;
    } else if (ap.status.name == "User Interview") {
      userinterview++;
    } else if (ap.status.name == "Offering") {
      offering++;
    } else if (ap.status.name == "Accepted") {
      accepted++;
    } else if (ap.status.name == "Rejected") {
      rejected++;
    }

    if (currentDate.getFullYear() == date.getFullYear()) {
      if (months[month] == "January") {
        monthApplyArr[0]++;
      } else if (months[month] == "February") {
        monthApplyArr[1]++;
      } else if (months[month] == "March") {
        monthApplyArr[2]++;
      } else if (months[month] == "April") {
        monthApplyArr[3]++;
      } else if (months[month] == "May") {
        monthApplyArr[4]++;
      } else if (months[month] == "June") {
        monthApplyArr[5]++;
      } else if (months[month] == "July") {
        monthApplyArr[6]++;
      } else if (months[month] == "August") {
        monthApplyArr[7]++;
      } else if (months[month] == "September") {
        monthApplyArr[8]++;
      } else if (months[month] == "October") {
        monthApplyArr[9]++;
      } else if (months[month] == "November") {
        monthApplyArr[10]++;
      } else if (months[month] == "December") {
        monthApplyArr[11]++;
      }
    }
  });

  // monthApplyArr.forEach((item, i) => { if (item == 0) monthApplyArr[i] = null; });

  useEffect(() => {
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
      .get(urlApply)
      .then((response) => {
        console.log(response.data.result);
        setApplies(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get("http://localhost:8088/api/interviews/ta")
      .then((response) => {
        setInterviewTAList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });

    axios
      .get("http://localhost:8088/api/interviews/trainer")
      .then((response) => {
        setInterviewTrainerList(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  }, []);

  const data = [
    { quarter: 1, earnings: screeningcv },
    { quarter: 2, earnings: hrinterview },
    { quarter: 3, earnings: userinterview },
    { quarter: 4, earnings: offering },
    { quarter: 5, earnings: accepted },
    { quarter: 6, earnings: rejected },
  ];
  return (
    <>
      {localStorage.getItem("role") === "Admin" ||
      localStorage.getItem("role") === "TA" ||
      localStorage.getItem("role") === "Trainer" ? (
        <div id="home-div-adm">
          <div id="dashboard-div">
            <h1>Dashboard</h1>

            <h3 style={{ fontSize: "15px" }}>Number of Activities</h3>
            <div id="act-number">
              <div>
                <p>Job vacancies</p>
                <p>{careers.length}</p>
              </div>

              <div>
                <p>Job appliance</p>
                <p>{applies.length}</p>
              </div>

              <div>
                <p>Talent Acquisition Interview</p>
                <p>{interviewTAList.length}</p>
              </div>

              <div>
                <p>Trainer Interview</p>
                <p>{interviewTrainerList.length}</p>
              </div>
            </div>

            <div id="charts">
              <div id="job-apply-chart">
                <h2>Job Appliance Status Chart</h2>
                <VictoryChart
                  // adding the material theme provided with Victory
                  theme={VictoryTheme.material}
                  domainPadding={20}
                  width={550}
                >
                  <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6]}
                    tickFormat={[
                      "Screening CV",
                      "HR Interview",
                      "User Interview",
                      "Offering",
                      "Accepted",
                      "Rejected",
                    ]}
                    // width={20}
                    // height={500}
                    style={{
                      tickLabels: { fontSize: 13 },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x}`}
                    style={{
                      tickLabels: { fontSize: 12 },
                    }}
                  />
                  <VictoryBar
                    data={data}
                    x="quarter"
                    y="earnings"
                    style={{
                      data: { fill: "#5088B6" },
                    }}
                  />
                </VictoryChart>
              </div>

              <div id="interview-pie-chart">
                <h2>Interview Chart</h2>
                <VictoryPie
                  data={[
                    {
                      x: `Talent Acquisition \n ${Math.round(
                        (interviewTAList.length /
                          (interviewTAList.length +
                            interviewTrainerList.length)) *
                          100
                      )}%`,
                      y: interviewTAList.length,
                    },
                    {
                      x: `Trainer \n ${Math.round(
                        (interviewTrainerList.length /
                          (interviewTAList.length +
                            interviewTrainerList.length)) *
                          100
                      )}%`,
                      y: interviewTrainerList.length,
                    },
                  ]}
                  width={600}
                  style={{
                    labels: {
                      fontSize: 15,
                    },
                  }}
                  colorScale={["#19B8C5", "#264A5C"]}
                />
              </div>
            </div>

            <div id="job-apply-date-chart">
              <h2 style={{ fontSize: "15px" }}>
                Job Appliance Monthly Chart({currentDate.getFullYear()})
              </h2>
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                width={800}
              >
                <VictoryLine
                  style={{
                    data: { stroke: "BLUE" },
                    parent: { border: "1px solid #ccc" },
                  }}
                  data={[
                    { x: "January", y: monthApplyArr[0] },
                    { x: "February", y: monthApplyArr[1] },
                    { x: "March", y: monthApplyArr[2] },
                    { x: "April", y: monthApplyArr[3] },
                    { x: "May", y: monthApplyArr[4] },
                    { x: "June", y: monthApplyArr[5] },
                    { x: "July", y: monthApplyArr[6] },
                    { x: "August", y: monthApplyArr[7] },
                    { x: "September", y: monthApplyArr[8] },
                    { x: "October", y: monthApplyArr[9] },
                    { x: "November", y: monthApplyArr[10] },
                    { x: "December", y: monthApplyArr[11] },
                  ]}
                  labels={({ datum }) => datum.y}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      ) : (
        <div id="home-div">
          <div id="home-carousel">
            <p id="first-p">Find Your Dream Job</p>
            <p id="second-p">
              Discover the perfect career that fulfills your aspirations and
              brings you joy.
            </p>
          </div>

          <div id="home-div-down">
            <div id="home-div-down1">
              <p>Search and find a career based on your preference</p>

              <div>
                <a href="/careers">
                  <button id="home-div-btn">GO TO CAREERS</button>
                </a>
              </div>
            </div>

            <div id="home-div-down2">
              <p>
                Apply for a job you choose and see the status of your appliance
              </p>
              {localStorage.getItem("role") === "Guest" ? (
                <a href="/login">
                  <button id="home-div-btn">GO TO JOB APPLY</button>
                </a>
              ) : (
                <a href="/apply_job">
                  <button id="home-div-btn">GO TO JOB APPLY</button>
                </a>
              )}
            </div>

            <div id="home-div-down3">
              <p>
                Attend the interview with Talent Acquisition and Trainer/User
              </p>
              {localStorage.getItem("role") === "Guest" ? (
                <a href="/login">
                  <button id="home-div-btn">GO TO INTERVIEW</button>
                </a>
              ) : (
                <a href="/interviews">
                  <button id="home-div-btn">GO TO INTERVIEW</button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
