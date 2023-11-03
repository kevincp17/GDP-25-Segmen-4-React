import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:"http://localhost:8088/api/cvinfo"
}

export const viewProfile=createSlice({
    name:'careers',
    initialState,
    reducers:{
        viewCareers:(state)=>{
            state.url="http://localhost:8088/api/cvinfo"
        }
    }
})

export const {viewCareers}= viewProfile.actions

export default viewProfile.reducer