import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:"http://localhost:8088/api/careers",
    payload:[]
}

export const viewData=createSlice({
    name:'careers',
    initialState,
    reducers:{
        viewCareers:(state)=>{
            state.url="http://localhost:8088/api/careers"
        },
        createCareer:(state,action)=>{
            state.url="http://localhost:8088/api/careers"
        }
    }
})

export const {viewCareers,createCareer}= viewData.actions

export default viewData.reducer