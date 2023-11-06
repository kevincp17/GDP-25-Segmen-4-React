import { configureStore } from "@reduxjs/toolkit";
import viewCareersData from "../features/viewCareersData";
import viewProfileData from "../features/viewProfileData";
import viewApplyData from "../features/viewApplyData";
import viewInterviewData from "../features/viewInterviewData";


export const store=configureStore({
    reducer:{
        viewCareersData:viewCareersData,
        viewProfileData:viewProfileData,
        apply:viewApplyData,
        interview:viewInterviewData
        
    }
})