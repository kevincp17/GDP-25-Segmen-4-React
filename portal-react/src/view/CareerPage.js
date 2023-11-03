import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Backdrop, Modal, Fade, Popover } from "@mui/material";
import $ from "jquery";
import "../css/careers.css";
import axios from "axios"
import { viewCareers } from "../features/viewCareersData";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export default function CareerPage() {
  let dispatch = useDispatch()
  const [careers, setCareers] = useState([]);

  const [open, setOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState();
  const [info, setInfo] = useState();
  const [modalDesc, setModalDesc] = useState();
  const [modalReq, setModalReq] = useState();
  const [modalPlace, setModalPlace] = useState();
  const [modalType, setModalType] = useState();

  const [refresh, setRefresh] = useState(false);
  const handleOpen = (data) => {
    let datetime = new Date(data.start_post_date).getTime();
    let now = new Date().getTime();
    let milisec_diff=0
    if (datetime < now) {
      milisec_diff = now - datetime;
    } else {
      milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    if (days > 30) {
      if (Math.floor(days / 30) > 1) {
        setInfo(Math.floor(days / 30)+" months ago")
      } else {
        setInfo(Math.floor(days / 30)+" month ago")
      }
    }
    else if (days < 30) {
      if (days > 7) {
        if (Math.floor(days / 7) > 1) {
          setInfo(Math.floor(days / 7) + " weeks ago")
        } else {
          setInfo(Math.floor(days / 7) + " week ago")
        }
      } else {
        if (days > 1) {
          setInfo(days + " days ago")
        } else if (days == 1) {
          setInfo(days + " day ago")
        }
      }
    }
    else if (days < 1) {
      setInfo(" today")
    }
    console.log(data);
    setModalTitle(data.title)
    setModalDesc(data.description)
    setModalReq(data.requirement)
    setModalPlace(data.placement)
    setModalType(data.type)
    setOpen(true);
  }


  const handleClose = () => setOpen(false);

  console.log(careers);

  const url = useSelector((state) => state.viewCareersData.url);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response);
        setCareers(response.data.result)
      })
      .catch(error => {
        console.error('Error:', error); // Handle any errors
      });
  }, [refresh])

  $(document).ready(function () {
    $("#select-input").change(function () {
      var selectValue = $(this).val().toLowerCase();
      $("#careers-div2 #job-data").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(selectValue) > -1);
      });
    });

    $("#search-input").on("keyup", function () {
      var searchvalue = $(this).val().toLowerCase();
      $("#careers-div2 #job-data").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(searchvalue) > -1);
      });
    });
  });

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
        <SearchIcon className="search-icon"/>
      </div>

      <div id="careers-div2">
        {
          careers.map(career => {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let dateStart = new Date(career.start_post_date)
            var dayStart = dateStart.getDate();
            var monthStart = dateStart.getMonth();
            var yearStart = dateStart.getFullYear();
            return (
              <div id="job-data" onClick={() => handleOpen(career)}>
                <img src={"/image/" + career.picture} />
                <p id="job-date">{dayStart + " " + months[monthStart] + " " + yearStart}</p>
                <p id="job-title">{career.title}</p>
                <p id="job-type">{career.type}</p>
                <div id="cd2-btndiv">
                  <button>LEARN MORE</button>
                </div>
              </div>
            )
          })
        }
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
                <p id="modal-title" class="modal-title">{modalTitle}</p>
                <p id="info" class="modal-title">
                {modalPlace} &#x2022; {modalType} Employment &#x2022; Posted {info}
                </p>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ><CloseIcon/></button>
            </div>
            <div class="modal-body">
              <p id="modal-desc">
                {modalDesc}
              </p>

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
              <button type="button" id="apply-btn">
                APPLY
              </button>
              <button type="button" id="close-btn" data-bs-dismiss="modal" onClick={handleClose}>
                CLOSE
              </button>
            </div>
          </div>
        </Fade>
      </Modal>

      {/* <div
        class="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <p id="modal-title" class="modal-title"></p>
                <p id="info" class="modal-title">
                  Jakarta &#x2022; Contract Employment &#x2022; Posted
                </p>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p id="modal-desc"></p>

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

                <div id="modal-req"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" id="apply-btn">
                APPLY
              </button>
              <button type="button" id="close-btn" data-bs-dismiss="modal">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
