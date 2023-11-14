import { configureStore } from "@reduxjs/toolkit";
import viewApplication from "../features/viewApplyData";
import viewCareersData from "../features/viewCareersData";
import viewProfileData from "../features/viewProfileData";
import viewSkills from "../features/viewSkills";
import viewEduProp from "../features/viewEduProp";
import viewInterviewData from "../features/viewInterviewData";

export const store=configureStore({
    reducer:{
        viewCareersData:viewCareersData,
        viewProfileData:viewProfileData,
        application: viewApplication,
        interview:viewInterviewData,
        viewSkills:viewSkills,
        viewEduProp:viewEduProp
    }
})