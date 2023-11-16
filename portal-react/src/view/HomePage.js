import React, { useState, useEffect } from "react";
import "../css/home.css";

export default function HomePage() {
  return (
    <div id="home-div">
      <div id="home-carousel">
        <p id="first-p">Find Your Dream Job</p>
        <p id="second-p">
          Discover the perfect career that fulfills your aspirations and brings
          you joy.
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
          <p>Apply for a job you choose and see the status of your appliance</p>
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
          <p>Attend the interview with Talent Acquisition and Trainer/User</p>
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
  );
}
