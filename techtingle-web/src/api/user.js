import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const profileView = () => {
    return axios.get(`${BASE_URL}/profile`,{ withCredentials: true });
}

export const feed = ()=>{
    return axios.get(`${BASE_URL}/user/feed`,{ withCredentials: true });
}

export const profileUpdate =(data,user)=>{
    return axios.patch(`${BASE_URL}/user/${user._id}`,data,{ withCredentials: true} );
}