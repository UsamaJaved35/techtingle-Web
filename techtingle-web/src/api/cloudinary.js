import axios from "axios";
const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

export const uploadPhoto = (formData) =>{
    return axios.post(CLOUDINARY_BASE_URL,formData,{headers: { "Content-Type": "multipart/form-data" },} );
}