import { configureStore } from "@reduxjs/toolkit";
import viewCareersData from "../features/viewCareersData";
import viewProfileData from "../features/viewProfileData";
import viewInterviewData from "../features/viewInterviewData";
import viewSkills from "../features/viewSkills";
import viewEduProp from "../features/viewEduProp";


export const store=configureStore({
    reducer:{
        viewCareersData:viewCareersData,
        viewProfileData:viewProfileData,
        interview:viewInterviewData,
        viewSkills:viewSkills,
        viewEduProp:viewEduProp
    }
})