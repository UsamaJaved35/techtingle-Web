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
        removeUserFromFeed:(state,action)=>{
            state.feed = state.feed.filter((user)=>user._id !== action.payload)
            return state
        },
        clearFeed:(state)=>{
            state.feed = null
        } 
    }
})

export const {addFeed,removeUserFromFeed,clearFeed} = feedSlice.actions;
export default feedSlice.reducer