// Register.jsx
import React, { useState} from 'react';
import styles from './Register.module.css';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const navigate=useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        // Create an object with the username, email, and password
        const userData = { username, email, password };

        try {
            const response = await axios.post('https://quiz-backend-m2w3.onrender.com/register', userData);
            console.log('Response:', response);

            if (response.status === 201) {
                // Registration successful, you can handle the success logic here
                enqueueSnackbar('Registration successful', { variant: 'success' });
                setLogin(true); 
                navigate('/login');
                // You can set the login state to true upon successful registration
            } else if (response.status === 409) {
                // User with the same email already exists
                enqueueSnackbar('User with this email already exists', { variant: 'error' });
              //  console.error('User with this email already exists');
                alert('User with this email already exists');
            } else {
                // Registration failed, handle the error (e.g., display an error message)
                enqueueSnackbar('Registration failed', { variant: 'error' });
              //  console.error('Registration failed');
                alert('Registration failed');
            }
        } catch (error) {
            enqueueSnackbar('Registration failed', { variant: 'error' });
        }
    };


    return (
        <div className={`${styles['container']}`}>
            <div className={`${styles['register-div']}`}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        placeholder='Enter your username'
                        onChange={(e) => setUsername(e.target.value)}
                        type='text'
                        value={username}
                    />
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
                    <button>Register</button>
                </form>
            </div>
        </div>
    );
}
