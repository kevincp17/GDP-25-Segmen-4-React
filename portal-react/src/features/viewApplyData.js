import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:"http://localhost:8088/api/apply"
}

export const viewData = createSlice({
    name:'application',
    initialState,
    reducers:{
        viewApplication:(state)=>{
            state.url="http://localhost:8088/api/apply"
        }
    }
})

export const {viewApplication}= viewData.actions

export default viewData.reducer