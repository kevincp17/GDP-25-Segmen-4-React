import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:"http://localhost:8088/api/cvinfo/",
    profileUrl:"http://localhost:8088/profile/cv/"
}

export const viewProfile=createSlice({
    name:'careers',
    initialState,
    reducers:{
        viewCareers:(state)=>{
            state.url="http://localhost:8088/api/cvinfo/"
        },
        viewUserProfile:(state,action)=>{
            state.profileUrl=action.payload
        }
    }
})

export const {viewCareers,viewUserProfile}= viewProfile.actions

export default viewProfile.reducer