import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from '../css/dashboard.module.css';
import Nav from './components/navbar'

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    // Check if the user is logged in
    const currentUser = JSON.parse(localStorage.getItem('loggedIn') || '{}');

    useEffect(() => {
        // If no user is found or the user data is invalid, redirect to login
        if (!currentUser.name || currentUser.name === 'object') {
            navigate('/login');
        }
    }, [currentUser, navigate]);


    return (
        <div>
           <Nav/>


        </div>
    );
};

export default Dashboard;
