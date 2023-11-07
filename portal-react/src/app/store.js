import { configureStore } from "@reduxjs/toolkit";
import viewApplication from "../features/viewApplyData";

export const store=configureStore({
    reducer:{
        // viewCareersData:viewCareersData,
        // viewProfileData:viewProfileData,
        application: viewApplication,
        // interview:viewInterviewData
    }
})