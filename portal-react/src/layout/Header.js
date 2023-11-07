import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie';
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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCareer, setAnchorCareer] = useState(null);
  localStorage.setItem("userId", Cookies.get("user_id"));
  localStorage.setItem("role", Cookies.get("role"));
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

  const logout = () => {
    // Cookies.remove("authenticated");
    Cookies.remove("user_id");
    Cookies.remove("role");
    Cookies.remove("email");
    localStorage.clear()
    navigate("/")
};

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const openPopoverCareer = Boolean(anchorCareer);
  const idPopoverCareer = openPopoverCareer ? "simple-popover" : undefined;
  return (
    <div>
      <div id="header-div">
        <a href="/main/home">
          <img src={weblogo} />
        </a>

        <div id="nav-menu">
          <Link to="/main/home">
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

              <div id="popover-body">
                <a href="/main/careers">View Careers</a>
                <hr />
                <a id="apply-list-btn" style={{color:"#4C5666"}} href="/main/apply_job">
                  Apply List
                </a>
              </div>
            </div>
          </Popover>

          <Link to="/main/interviews">
            <button>INTERVIEWS</button>
          </Link>
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

            <div id="popover-body">
              {localStorage.getItem("role") === "Applicant" ? (
                <>
                  <a href="/main/profile">View Profile</a>
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
      </div>
    </div>
  );
}
