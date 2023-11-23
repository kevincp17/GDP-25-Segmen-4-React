import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import weblogo from "../image/weblogo-amartek.png";
import profile from "../image/profile.png";
import "../css/Layout.css";
import { Link } from "react-router-dom";
import { Popover } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { viewUserProfile } from "../features/viewProfileData";
import { Navigate, useNavigate } from "react-router-dom";

export default function Headers() {
  console.log(localStorage.getItem("role"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCareer, setAnchorCareer] = useState(null);
  const [anchorInterview, setAnchorInterview] = useState(null);
  const [anchorMaster, setAnchorMaster] = useState(null);
  // localStorage.setItem("userId", Cookies.get("user_id"));
  // localStorage.setItem("role", Cookies.get("role"));
  const url = useSelector((state) => state.viewProfileData.profileUrl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClickCareer = (event) => {
    setAnchorCareer(event.currentTarget);
  };

  const handleClosePopoverCareer = () => {
    setAnchorCareer(null);
  };

  const handleClickInterview = (event) => {
    setAnchorInterview(event.currentTarget);
  };

  const handleClosePopoverInterview = () => {
    setAnchorInterview(null);
  };

  const handleClickMaster = (event) => {
    setAnchorMaster(event.currentTarget);
  };

  const handleClosePopoverMaster = () => {
    setAnchorMaster(null);
  };

  const logout = () => {
    // Cookies.remove("authenticated");
    Cookies.remove("user_id");
    Cookies.remove("role");
    Cookies.remove("email");
    localStorage.clear();
    localStorage.setItem("role", "Guest");
    navigate("/");
  };

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const openPopoverCareer = Boolean(anchorCareer);
  const idPopoverCareer = openPopoverCareer ? "simple-popover" : undefined;

  const openPopoverInterview = Boolean(anchorInterview);
  const idPopoverInterview = openPopoverInterview
    ? "simple-popover"
    : undefined;

  const openPopoverMaster = Boolean(anchorMaster);
  const idPopoverMaster = openPopoverMaster ? "simple-popover" : undefined;
  return (
    <div>
      <div
        id={
          localStorage.getItem("role") === "Admin"
            ? "header-div-adm"
            : "header-div"
        }
      >
        {localStorage.getItem("role") === "Admin" ? (
          <>
            <a href="/">
              <img src={weblogo} />
            </a>

            {localStorage.getItem("role") === "Guest" ? (
              <a href="/login">
                <button id="to-login">LOGIN</button>
              </a>
            ) : (
              <>
                <button
                  id={
                    localStorage.getItem("role") === "Admin"
                      ? "profile-btn-adm"
                      : "profile-btn"
                  }
                  aria-describedby={idPopover}
                  onClick={handleClick}
                >
                  <img src={profile} />
                </button>
                <Popover
                  id={idPopover}
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div id="popover">
                    <p id="popover-header">User Menu</p>

                    <div
                      id="popover-body"
                      style={
                        localStorage.getItem("role") !== "Applicant"
                          ? { height: "30px" }
                          : null
                      }
                    >
                      {localStorage.getItem("role") === "Applicant" ? (
                        <>
                          <a href="/profile">View Profile</a>
                          <hr />
                          <a id="logout-btn" onClick={logout}>
                            Logout
                          </a>
                        </>
                      ) : (
                        <>
                          <a id="logout-btn" onClick={logout}>
                            Logout
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </Popover>

                <div
                  id={
                    localStorage.getItem("role") === "Admin"
                      ? "nav-menu-adm"
                      : "nav-menu"
                  }
                >
                  <Link to="">
                    <button>HOME</button>
                  </Link>

                  {localStorage.getItem("role") === "Admin" ? (
                    <>
                      <Link>
                        <button
                          aria-describedby={idPopoverMaster}
                          onClick={handleClickMaster}
                        >
                          MASTER
                        </button>
                      </Link>

                      <Popover
                        id={idPopoverMaster}
                        open={openPopoverMaster}
                        anchorEl={anchorMaster}
                        onClose={handleClosePopoverMaster}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        style={{marginLeft:'110px',marginTop:'-35px'}}
                      >
                        <div id="popover">
                          <p id="popover-header">Master Menu</p>

                          <div id="popover-body" style={{height:"125px"}}>
                            <a
                              style={
                                localStorage.getItem("role") !== "Applicant"
                                  ? { color: "#4C5666" }
                                  : null
                              }
                              href="/master_skill"
                            >
                              Skills Data
                            </a>

                            <hr />
                            <a
                              id="apply-list-btn"
                              style={{ color: "#4C5666" }}
                              href="/master_institute"
                            >
                              Institute Data
                            </a>

                            <hr />
                            <a
                              id="apply-list-btn"
                              style={{ color: "#4C5666" }}
                              href="/master_degree"
                            >
                              Degree Data
                            </a>

                            <hr />
                            <a
                              id="apply-list-btn"
                              style={{ color: "#4C5666" }}
                              href="/master_major"
                            >
                              Major Data
                            </a>
                          </div>
                        </div>
                      </Popover>
                    </>
                  ) : null}

                  <Link>
                    <button
                      aria-describedby={idPopoverCareer}
                      onClick={handleClickCareer}
                    >
                      CAREERS
                    </button>
                  </Link>

                  <Popover
                    id={idPopoverCareer}
                    open={openPopoverCareer}
                    anchorEl={anchorCareer}
                    onClose={handleClosePopoverCareer}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    style={{marginLeft:'110px',marginTop:'-35px'}}
                  >
                    <div id="popover">
                      <p id="popover-header">Career Menu</p>

                      <div
                        id="popover-body"
                        style={
                          localStorage.getItem("role") === "Guest" ||
                          localStorage.getItem("role") === "Trainer"
                            ? { height: "30px" }
                            : null
                        }
                      >
                        <a
                          style={
                            localStorage.getItem("role") !== "Applicant"
                              ? { color: "#4C5666" }
                              : null
                          }
                          href="/careers"
                        >
                          View Careers
                        </a>
                        {localStorage.getItem("role") === "Guest" ||
                        localStorage.getItem("role") === "Trainer" ? null : (
                          <>
                            <hr />
                            <a
                              id="apply-list-btn"
                              style={{ color: "#4C5666" }}
                              href="/apply_job"
                            >
                              Apply List
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </Popover>
                  {localStorage.getItem("role") === "Guest" ? (
                    <a href="/login">
                      <button>INTERVIEWS</button>
                    </a>
                  ) : (
                    <>
                      <Link>
                        <button
                          aria-describedby={idPopoverInterview}
                          onClick={handleClickInterview}
                        >
                          INTERVIEWS
                        </button>
                      </Link>

                      <Popover
                        id={idPopoverInterview}
                        open={openPopoverInterview}
                        anchorEl={anchorInterview}
                        onClose={handleClosePopoverInterview}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        style={{marginLeft:'110px',marginTop:'-35px'}}
                      >
                        <div id="popover">
                          <p id="popover-header">Interview Menu</p>

                          <div
                            id="popover-body"
                            style={
                              localStorage.getItem("role") === "Guest" ||
                              localStorage.getItem("role") === "Trainer"
                                ? { height: "30px" }
                                : null
                            }
                          >
                            <a
                              style={
                                localStorage.getItem("role") !== "Applicant"
                                  ? { color: "#4C5666" }
                                  : null
                              }
                              href="/interviews/ta"
                            >
                              Talent Acquisition Interview
                            </a>
                            {localStorage.getItem("role") === "Guest" ||
                            localStorage.getItem("role") ===
                              "Trainer" ? null : (
                              <>
                                <hr />
                                <a
                                  id="apply-list-btn"
                                  style={{ color: "#4C5666" }}
                                  href="/interviews/trainer"
                                >
                                  Trainer Interview
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </Popover>
                    </>
                  )}
                </div>

                <div
                  id={
                    localStorage.getItem("role") === "Admin"
                      ? "sosmed-btn-adm"
                      : "sosmed-btn"
                  }
                >
                  <button>
                    {/* <i class="fa-brands fa-instagram"></i> */}
                    <InstagramIcon />
                  </button>

                  <button>
                    {/* <i class="fa-brands fa-linkedin"></i> */}
                    <LinkedInIcon />
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <a href="/">
              <img src={weblogo} />
            </a>

            <div id="nav-menu">
              <Link to="">
                <button>HOME</button>
              </Link>

              <Link>
                <button
                  aria-describedby={idPopoverCareer}
                  onClick={handleClickCareer}
                >
                  CAREERS
                </button>
              </Link>

              <Popover
                id={idPopoverCareer}
                open={openPopoverCareer}
                anchorEl={anchorCareer}
                onClose={handleClosePopoverCareer}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div id="popover">
                  <p id="popover-header">Career Menu</p>

                  <div
                    id="popover-body"
                    style={
                      localStorage.getItem("role") === "Guest" ||
                      localStorage.getItem("role") === "Trainer"
                        ? { height: "30px" }
                        : null
                    }
                  >
                    <a
                      style={
                        localStorage.getItem("role") !== "Applicant"
                          ? { color: "#4C5666" }
                          : null
                      }
                      href="/careers"
                    >
                      View Careers
                    </a>
                    {localStorage.getItem("role") === "Guest" ||
                    localStorage.getItem("role") === "Trainer" ? null : (
                      <>
                        <hr />
                        <a
                          id="apply-list-btn"
                          style={{ color: "#4C5666" }}
                          href="/apply_job"
                        >
                          Apply List
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </Popover>
              {localStorage.getItem("role") === "Guest" ? (
                <a href="/login">
                  <button>INTERVIEWS</button>
                </a>
              ) : (
                <Link to="/interviews">
                  <button>INTERVIEWS</button>
                </Link>
              )}
            </div>

            <div id="sosmed-btn">
              <button>
                {/* <i class="fa-brands fa-instagram"></i> */}
                <InstagramIcon />
              </button>

              <button>
                {/* <i class="fa-brands fa-linkedin"></i> */}
                <LinkedInIcon />
              </button>
            </div>

            {localStorage.getItem("role") === "Guest" ? (
              <a href="/login">
                <button id="to-login">LOGIN</button>
              </a>
            ) : (
              <>
                <button
                  id="profile-btn"
                  aria-describedby={idPopover}
                  onClick={handleClick}
                >
                  <img src={profile} />
                </button>
                <Popover
                  id={idPopover}
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div id="popover">
                    <p id="popover-header">User Menu</p>

                    <div
                      id="popover-body"
                      style={
                        localStorage.getItem("role") !== "Applicant"
                          ? { height: "30px" }
                          : null
                      }
                    >
                      {localStorage.getItem("role") === "Applicant" ? (
                        <>
                          <a href="/profile">View Profile</a>
                          <hr />
                          <a id="logout-btn" onClick={logout}>
                            Logout
                          </a>
                        </>
                      ) : (
                        <>
                          <a id="logout-btn" onClick={logout}>
                            Logout
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </Popover>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
