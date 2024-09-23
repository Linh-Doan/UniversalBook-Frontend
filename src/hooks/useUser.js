import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { endpoints } from '../config';

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function fetchUser(){
            try {
                const response = await axiosInstance.get(`${endpoints.currentUser}`);
                setIsLoading(false);
                setUser(response.data.data.user);
            } catch (err) {
                setIsLoading(false);
            }
        }
        fetchUser();
    }, []);
    return {isLoading, user, userId: user?.account_id, isAuthenticated: user ? true: false}
}