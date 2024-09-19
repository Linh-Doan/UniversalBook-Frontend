import axiosInstance from "../api/axiosInstance";
import { endpoints } from '../config.js';

export class AuthError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthError';
    }
  }

export async function login(loginDetails){
    try{
        await axiosInstance.post(`${endpoints.login}`, 
        loginDetails,
        {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        );
    } catch (error) {
        if (error.response.status === 401) {
            throw new AuthError('Authentication failed: Invalid credentials');
        } else {
            throw error;
        }
    }
}

export async function register(authDetails){
    try {
        await axiosInstance.post(
            `${endpoints.signup}`,
            authDetails, 
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
    } catch (error) {
        throw error;
    }
    
}

export async function logout(){
    try {
        await axiosInstance.post(`${endpoints.logout}`);
    } catch (err) {
        console.log(err)
    }
}