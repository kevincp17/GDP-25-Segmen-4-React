import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:"http://localhost:8088/api/skill",
}

export const viewSkills=createSlice({
    name:'skills',
    initialState,
    reducers:{
        viewSkills:(state)=>{
            state.url="http://localhost:8088/api/skill"
        }
    }
})

export const {viewCareers,viewUserProfile}= viewSkills.actions

export default viewSkills.reducer