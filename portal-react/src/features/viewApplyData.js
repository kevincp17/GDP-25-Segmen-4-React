import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:"http://localhost:8088/api/apply"
}

export const viewData = createSlice({
    name:'apply',
    initialState,
    reducers:{
        viewApply:(state)=>{
            state.url="http://localhost:8088/api/apply"
        }
    }
})

export const {viewApply}= viewData.actions

export default viewData.reducer