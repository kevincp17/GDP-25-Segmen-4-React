import React, { useState, useEffect } from "react";
import "../css/home.css";

export default function HomePage() {
  // let img = [
  //   "job-search.jpg",
  //   "job-apply.jpg",
  //   "job-interview.jpg",
  //   "job-offer.jpg",
  // ];

  // let p1 = [
  //   "Find Your Dream Job",
  //   "Apply For A Job",
  //   "Attend The Interview",
  //   "Accept The Job Offer",
  // ];

  // let p2 = [
  //   "Discover the perfect career that fulfills your aspirations and brings you joy.",
  //   "To seek employment, submit an application.",
  //   "Participate in the interview.",
  //   "Receive the job offer",
  // ];

  // let carouselIndex = 0;

  // setInterval(() => {
  //   // <img src="image/profile.png" />
  //   document.getElementById("carousel").innerHTML =
  //     "<img id='img-carousel' src=/image/" + img[carouselIndex] + ">";

  //   document.getElementById("first-p").innerHTML =p1[carouselIndex]
  //   document.getElementById("second-p").innerHTML =p2[carouselIndex]

  //   carouselIndex++;

  //   if (carouselIndex === 4) {
  //     carouselIndex = 0;
  //   }
  // }, 5000);

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
          <a href="/apply_job">
            <button id="home-div-btn">GO TO JOB APPLY</button>
          </a>
        </div>

        <div id="home-div-down3">
          <p>Attend the interview with Talent Acquisition and Trainer/User</p>
          <a href="/interviews">
            <button id="home-div-btn">GO TO INTERVIEW</button>
          </a>
        </div>
      </div>
    </div>
  );
}
