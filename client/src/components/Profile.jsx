import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function Profile() {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const {enqueueSnackbar}= useSnackbar();
    useEffect(() => {
        // Define a function to fetch user details
        const fetchUserDetails = async () => {
            try {
                enqueueSnackbar('fetching user details', { variant: 'info' });
                console.log(token);
                const response = await axios.get(`http://localhost:8000/user/${token}`); // Replace with your backend API endpoint
                setUser(response.data);
              //  console.log(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        // Call the function when the component mounts
        fetchUserDetails();
    }, [token]);

    return (
        <div>
            <h1 className='text-light'>Profile</h1>
            {user && (
                <div className='result flex-center'>
                    <div className='flex'>
                        <span>Username :</span>
                        <span className='bold'>{user.username}</span>
                    </div>
                    <div className='flex'>
                        <span>totalGames:</span>
                        <span className='bold'>{user.won + user.lost}</span>
                    </div>
                    <div className='flex'>
                        <span>Games won :</span>
                        <span className='bold'>{user.won}</span>
                    </div>
                    <div className='flex'>
                        <span>Games lost :</span>
                        <span className='bold'>{user.lost}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
