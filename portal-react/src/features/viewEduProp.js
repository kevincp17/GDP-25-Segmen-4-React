import { createSlice } from "@reduxjs/toolkit";

const initialState={
    urlMajor:"http://localhost:8088/api/education/major",
    urlDegree:"http://localhost:8088/api/education/degree",
    urlInstitute:"http://localhost:8088/api/education/institute",
}

export const viewEduProps=createSlice({
    name:'edu_props',
    initialState,
    reducers:{
        viewSkills:(state)=>{
            state.url="http://localhost:8088/api/skill"
        }
    }
})

export const {viewSkills}= viewEduProps.actions

export default viewEduProps.reducer