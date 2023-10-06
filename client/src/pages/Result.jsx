import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { resetResultAction } from '../redux/result_reducer';
import { resetAllAction } from '../redux/question_reducer'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useSnackbar } from 'notistack';

export default function Result() {
  const [user, setUser] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [win, setWin] = useState(false);
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('username');
  const dispatch = useDispatch();
  const { questions: { questions, answers }, result: { result } } = useSelector((state) => state);
  const [score, setScore] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const start = localStorage.getItem('trace');

  useEffect(() => {
    

    // Use a forEach loop or map to iterate through the questions and update the score
    let newScore = 0;
    for (var i = 0; i < 30; i++) {
      if (parseInt(result[i]) === parseInt(answers[i])) {
        newScore += 10;
      }
    }
    setScore(newScore); // Update the score once after the loop

    if (newScore > 200) { // Use newScore here instead of score
      setWin(true);
      localStorage.setItem('win',1);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('https://quiz-backend-m2w3.onrender.com/results', {
          params: { token, win }, // You should define email and password here
        });

        // Handle your response data as needed
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleReset = () => {
    enqueueSnackbar('Resetting', { variant: 'info' });
    dispatch(resetResultAction());
    dispatch(resetAllAction());
    window.location.reload();
    window.location.href = '/';
  }

  return (
    <>
      <Header />
      <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <div className='result flex-center'>
          <div className='flex'>
            <span>Username:</span>
            <span className='bold'>{userName}</span>
          </div>
          <div className='flex'>
            <span>Total Number of questions:</span>
            <span className='bold'>{result.length}</span>
          </div>
          <div className='flex'>
            <span>Total points:</span>
            <span className='bold'>{result.length * 10}</span>
          </div>
          <div className='flex'>
            <span>Points received:</span>
            <span className='bold'>{score}</span>
          </div>
          <div className='flex'>
            <span>Quiz result:</span>
            <span className='bold'>{score > 200 ? "Pass" : "Fail"}</span>
          </div>
        </div>
        <div className="start">
          <Link className='btn' to={'/'} onClick={handleReset}>Restart</Link>
        </div>
        <br />
        <Profile />
      </div>
    </>
  );
}
