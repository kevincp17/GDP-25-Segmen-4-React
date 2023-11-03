import { useState } from "react";
import weblogo from "../image/weblogo-amartek.png";
import profile from "../image/profile.png";
import "../css/Layout.css";
import { Link } from "react-router-dom";
import { Popover } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Headers() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;
  return (
    <div>
      <div id="header-div">
        <a href="/">
          <img src={weblogo} />
        </a>

        <div id="nav-menu">
          <Link to="/">
            <button>HOME</button>
          </Link>

          <Link to="/careers">
            <button>CAREERS</button>
          </Link>

          <Link to="/interviews">
            <button>INTERVIEWS</button>
          </Link>
        </div>

        <div id="sosmed-btn">
          <button>
            {/* <i class="fa-brands fa-instagram"></i> */}
            <InstagramIcon/>
          </button>

          <button>
            {/* <i class="fa-brands fa-linkedin"></i> */}
            <LinkedInIcon/>
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
              <a href="profile">View Profile</a>
              <hr/>
              <a id="logout-btn" href="interviews">Logout</a>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
}
