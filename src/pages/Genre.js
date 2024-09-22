import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { endpoints } from '../config.js';
import axiosInstance from '../api/axiosInstance.js';


export const Genre = () => {
    const { id } = useParams(); // `id` is the chapter ID from the URL
    return (
        <div>
            abc
            {id}
        </div>
    ); 
};
