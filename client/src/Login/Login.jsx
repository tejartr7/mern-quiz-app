import React, { useState, useEffect } from 'react';
import styles from './Register.module.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useSnackbar } from 'notistack';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation to access the location object
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8000/login', {
                params: { email, password },
            });
            try {
                localStorage.setItem('token', response.data.user._id);
                localStorage.setItem('username', response.data.user.username);
                enqueueSnackbar('login successful', { variant: 'success' });
            } catch (error) {
                console.error('Local storage error:', error);
                enqueueSnackbar('Error', { variant: 'error' });
            }

            if (response.status === 200) {
                window.location.reload();
            } else {
                console.error('Login failed');
                enqueueSnackbar('Error', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar('Error', { variant: 'error' });
        }
    };

    return (
        <div className={`${styles['container']}`}>
            <div className={`${styles['register-div']}`}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        value={email}
                    />
                    <label>Password</label>
                    <input
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        value={password}
                    />
                    <button>Login</button>
                </form>
                <p>Are you a new user?</p>
                <a href='/register'>Register</a>
            </div>
        </div>
    );
}
