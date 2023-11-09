import React, { useState, useEffect } from "react";
import "../css/home.css";

export default function HomePage() {
  let img = [
    "job-search.jpg",
    "job-apply.jpg",
    "job-interview.jpg",
    "job-offer.jpg",
  ];

  let p1 = [
    "Find Your Dream Job",
    "Apply For A Job",
    "Attend The Interview",
    "Accept The Job Offer",
  ];

  let p2 = [
    "Discover the perfect career that fulfills your aspirations and brings you joy.",
    "To seek employment, submit an application.",
    "Participate in the interview.",
    "Receive the job offer",
  ];

  let carouselIndex = 0;

  setInterval(() => {
    // <img src="image/profile.png" />
    document.getElementById("carousel").innerHTML =
      "<img id='img-carousel' src=/image/" + img[carouselIndex] + ">";

    document.getElementById("first-p").innerHTML =p1[carouselIndex]
    document.getElementById("second-p").innerHTML =p2[carouselIndex]
     
    carouselIndex++;

    if (carouselIndex === 4) {
      carouselIndex = 0;
    }
  }, 5000);

  return (
    <div id="home-div">
      <div id="home-carousel">
        <div id="carousel">
          <img src="/image/job-search.jpg" />
        </div>

        <div id="home-inside-div">
          <p id="first-p">Find Your Dream Job</p>
          <p id="second-p">
            Discover the perfect career that fulfills your aspirations and brings you joy.
          </p>
        </div>
      </div>

      {/* <div id="home-div-down">halaman home bawah</div> */}
    </div>
  );
}
