import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:"http://localhost:8088/api/interviews/"
}

export const viewData = createSlice({
    name:'interview',
    initialState,
    reducers:{
        viewInterviews:(state)=>{
            state.url="http://localhost:8088/api/interviews/"
        }
    }
})

export const {viewInterviews}= viewData.actions

export default viewData.reducer