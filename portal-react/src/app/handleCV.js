import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
// Create styles

export default function MyDocument() {
  const [skillList, setSkillList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);

  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);

  console.log(softSkills);
  console.log(hardSkills);
  console.log(skillList);

  const [userName, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();

  const url = useSelector((state) => state.viewProfileData.url);
  const urlProfile = useSelector((state) => state.viewProfileData.profileUrl);

  Font.register({ family: "Courier", fontStyle: "italic", fontWeight: "bold" });

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#d11fb6",
      color: "white",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
  });

  useEffect(() => {
    axios
      .get(url + localStorage.getItem("userId") + "/skill")
      .then((response) => {
        setSkillList(response.data.result);
        console.log(response.data.result);
        response.data.result.map(sf=>{
          if(sf.skill.skill_type === "Soft Skills"){
            softSkills.push(sf.skill.name)
            // setSoftSkills([...softSkills,{name:sf.skill.name}])
          }               
          // else if(sf.skill.skill_type === "Hard Skills"){
          //   hardSkills.push(sf.skill.name)
          //   // setHardSkills([...hardSkills,{name:sf.skill.name}])
          // }
        })
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
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  }, []);

  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={{ padding: "60px 80px 0px 80px" }} wrap={false}>
          <View style={{ marginBottom: "30px" }}>
            <View
              style={{
                border: "1px #062D49 solid",
                borderRadius: "5px",
                height: "30px",
                backgroundColor: "#062D49",
                color: "white",
                width: "100%",
              }}
            >
              <Text
                style={{
                  marginTop: "5px",
                  marginLeft: "20px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                PROFILE
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "20px 20px 0px 20px",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: "17px",
                    fontWeight: "bolder",
                    marginBottom: "10px",
                    width: "100%",
                    flexBasis: "75%",
                    marginRight: "400px",
                  }}
                >
                  {userName}
                </Text>
                <Text
                  style={{
                    fontSize: "17px",
                    fontWeight: "bolder",
                    marginBottom: "10px",
                  }}
                >
                  {phone}
                </Text>
                <Text
                  style={{
                    fontSize: "17px",
                    fontWeight: "bolder",
                    marginBottom: "10px",
                  }}
                >
                  {address}
                </Text>
                <Text style={{ fontSize: "17px", fontWeight: "bolder" }}>
                  {email}
                </Text>
              </View>

              <Image
                style={{ width: "50px", height: "100px", flexBasis: "25%" }}
                src="/image/profile.png"
              />
            </View>
          </View>

          <View style={{ marginBottom: "30px" }}>
            <View
              style={{
                border: "1px #062D49 solid",
                borderRadius: "5px",
                height: "30px",
                backgroundColor: "#062D49",
                //
                // fontWeight: "800",
                color: "white",
              }}
            >
              <Text
                style={{
                  marginTop: "5px",
                  marginLeft: "20px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                SKILLS
              </Text>
            </View>

            <View
              style={{
                padding: "20px 20px 0px 20px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{marginRight:'20px'}}>
                <Text style={{marginBottom:'5px'}}>Soft Skills</Text>
                {skillList.map((s) => {
                  return (
                    <Text
                      style={{
                        fontSize: "13px",
                        fontWeight: "bolder",
                        marginBottom: "5px",
                        fontStyle: "italic",
                      }}
                    >
                      {s.skill.skill_type === "Soft Skills"
                        ? s.skill.name
                        : false}
                    </Text>
                  );
                })}
              </View>

              <View>
              <Text>Hard Skills</Text>
                {skillList.map((s) => {
                  return (
                    <Text
                      style={{
                        fontSize: "13px",
                        fontWeight: "bolder",
                        marginBottom: "5px",
                        fontStyle: "italic",
                      }}
                    >
                      {s.skill.skill_type === "Hard Skills"
                        ? s.skill.name
                        : <></>}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={{ marginBottom: "30px" }}>
            <View
              style={{
                border: "1px #062D49 solid",
                borderRadius: "5px",
                height: "30px",
                backgroundColor: "#062D49",
                color: "white",
              }}
            >
              <Text
                style={{
                  marginTop: "5px",
                  marginLeft: "20px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                PROFESIONAL EXPERIENCES
              </Text>
            </View>

            <View style={{ padding: "20px 20px 0px 20px" }}>
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
                  <View style={{ marginBottom: "20px" }}>
                    <Text
                      style={{
                        fontSize: "20px",
                        fontWeight: "heavy",
                        textDecoration: "underline",
                        marginBottom: "5px",
                      }}
                    >
                      {e.experience.company_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: "15px",
                        fontWeight: "heavy",
                        marginBottom: "5px",
                      }}
                    >
                      {months[monthStart] +
                        " " +
                        yearStart +
                        " - " +
                        months[monthEnd] +
                        " " +
                        yearEnd +
                        "(as " +
                        e.experience.job_title +
                        ")"}
                    </Text>

                    <Text style={{ fontSize: "15px", fontWeight: "heavy" }}>
                      {e.experience.job_desc}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={{ marginBottom: "30px" }}>
            <View
              style={{
                border: "1px #062D49 solid",
                borderRadius: "5px",
                height: "30px",
                backgroundColor: "#062D49",
                color: "white",
              }}
            >
              <Text
                style={{
                  marginTop: "5px",
                  marginLeft: "20px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                CERTIFICATIONS
              </Text>
            </View>

            <View style={{ padding: "20px 20px 0px 20px" }}>
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
                  <View>
                    <Text style={{ fontSize: "15px", fontWeight: "heavy" }}>
                      {c.certification.certification_name} -{" "}
                      {c.certification.organizer_name}
                    </Text>

                    <Text style={{ fontSize: "15px", fontWeight: "heavy" }}>
                      {months[monthStart] + " " + yearStart}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={{ marginBottom: "30px" }}>
            <View
              style={{
                border: "1px #062D49 solid",
                borderRadius: "5px",
                height: "30px",
                backgroundColor: "#062D49",
                color: "white",
              }}
            >
              <Text
                style={{
                  marginTop: "5px",
                  marginLeft: "20px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                EDUCATIONS
              </Text>
            </View>

            <View style={{ padding: "20px 20px 0px 20px" }}>
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
                  <View style={{ marginBottom: "10px" }}>
                    <Text
                      style={{
                        color: "#4F81BD",
                        fontSize: "15px",
                        marginBottom: "5px",
                      }}
                    >
                      {ed.education.institute.name} ({yearStart}-{yearEnd})
                    </Text>
                    <Text style={{ fontSize: "13px" }}>
                      {ed.education.degree.name +
                        " of " +
                        ed.education.major.name}
                    </Text>
                    <Text style={{ fontSize: "13px" }}>
                      GPA: {ed.education.gpa}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
