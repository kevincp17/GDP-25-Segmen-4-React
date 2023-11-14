import { configureStore } from "@reduxjs/toolkit";
import viewApplication from "../features/viewApplyData";
import viewProfileData from "../features/viewProfileData";
import viewCareersData from "../features/viewCareersData";
import viewInterviewData from "../features/viewInterviewData";

export const store=configureStore({
    reducer:{
        viewCareersData:viewCareersData,
        viewProfileData:viewProfileData,
        application: viewApplication,
        interview:viewInterviewData
    }
})