import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:"http://localhost:8088/api/careers"
}

export const viewData=createSlice({
    name:'careers',
    initialState,
    reducers:{
        viewCareers:(state)=>{
            state.url="http://localhost:8088/api/careers"
        }
    }
})

export const {viewCareers}= viewData.actions

export default viewData.reducer