import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Protected({children}) { 
    let [isLoggedIn, setIsLoggedIn] = useState(true);
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setIsLoggedIn(true)
        }).catch(() => {
            setIsLoggedIn(false)
        })
    }, [])
    
    if(!isLoggedIn)
        return <Navigate to="/"/>


    return children
}
