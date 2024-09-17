import axiosInstance from "../api/axiosInstance";
import { endpoints } from '../config.js';
export async function login(loginDetails){
    await axiosInstance.post(`${endpoints.login}`, 
        loginDetails,
        {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    );
}

export async function register(authDetails){
    await axiosInstance.post(
        `${endpoints.signup}`,
        authDetails, 
        {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    )
}

export async function logout(){
    try {
        await axiosInstance.post(`${endpoints.logout}`);
    } catch (err) {
        console.log(err)
    }
}