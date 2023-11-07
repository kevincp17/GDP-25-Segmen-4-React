import { configureStore } from "@reduxjs/toolkit";
import viewCareersData from "../features/viewCareersData";
import viewProfileData from "../features/viewProfileData";
import viewSkills from "../features/viewSkills";
import viewEduProp from "../features/viewEduProp";

export const store=configureStore({
    reducer:{
        viewCareersData:viewCareersData,
        viewProfileData:viewProfileData,
        viewSkills:viewSkills,
        viewEduProp:viewEduProp
    }
})