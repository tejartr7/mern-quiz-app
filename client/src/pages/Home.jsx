import React from 'react'
import inputRef from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import Quiz from './Quiz'
import Header from '../components/Header'
import '../styles/home.css'
const Home = () => {
    console.log(localStorage.getItem('token'));
    return (
        <><Header /><div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>
            <ol>
                <li>You will be asked 30 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has Four options. You can choose only one options.</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
                <li>If you score more than 70% then you have pass the quiz</li>
            </ol>
            <div className='start'>
                <Link className='btn' to={'quiz'}>Start Quiz</Link>
            </div>
        </div></>
    )
}

export default Home
