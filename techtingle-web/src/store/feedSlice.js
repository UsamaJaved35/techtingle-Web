import { createSlice } from "@reduxjs/toolkit";
import { feed } from "../api/user";

const feedSlice = createSlice({
    name:"feed",
    initialState:{
        feed: null
    },
    reducers:{
        addFeed:(state,action)=>{
            state.feed = action.payload
            return state
        },
        removeFeed:(state,action)=>{
            state.feed = null
            return state
        } 
    }
})

export const {addFeed,removeFeed} = feedSlice.actions;
export default feedSlice.reducer