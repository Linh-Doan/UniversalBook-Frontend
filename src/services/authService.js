import axiosInstance from "../api/axiosInstance";
import { endpoints } from '../config.js';
// export async function login(authDetail){
//     const requestOptions = {
//         method: "POST",
//         headers: {"content-Type": "application/json"},
//         body: JSON.stringify(authDetail)
//     }
//     const response = await fetch(`${process.env.REACT_APP_HOST}/login`, requestOptions);
//     if(!response.ok){
//         throw { message: response.statusText, status: response.status }; //eslint-disable-line
//     }
//     const data = await response.json();
//     if(data.accessToken){
//         sessionStorage.setItem("token", JSON.stringify(data.accessToken));
//         sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
//     }
//     return data;
// }

// export async function register(authDetail){
//     const requestOptions = {
//         method: "POST",
//         headers: {"content-Type": "application/json"},
//         body: JSON.stringify(authDetail)
//     }  
//     const response = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOptions);
//     if(!response.ok){
//         throw { message: response.statusText, status: response.status }; //eslint-disable-line
//     }
//     const data = await response.json();
    
//     if(data.accessToken){
//         sessionStorage.setItem("token", JSON.stringify(data.accessToken));
//         sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
//     }

//     return data;
// }

export async function logout(){
    try {
        await axiosInstance.post(`${endpoints.logout}`);
    } catch (err) {
        console.log(err)
    }
}

export async function getCurrentUser() {
    try {
        const response = await axiosInstance.get(`${endpoints.currentUser}`);
        return response.data.data.user
    } catch (err) {
        return null;
    }
}