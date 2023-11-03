import { configureStore } from "@reduxjs/toolkit";
import viewCareersData from "../features/viewCareersData";
import viewProfileData from "../features/viewProfileData";


export const store=configureStore({
    reducer:{
        viewCareersData:viewCareersData,
        viewProfileData:viewProfileData
    }
})