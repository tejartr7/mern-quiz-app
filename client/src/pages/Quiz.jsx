import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import { useDispatch, useSelector } from 'react-redux';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/fetch';
import { PushAnswer, updateResult } from '../hooks/setResult';
import { moveNextAction, movePrevAction } from '../redux/question_reducer';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [option, setOption] = useState(null);
    const { queue, trace } = useSelector((state) => state.questions);
    const state = useSelector((state) => state);
    const result = useSelector((state) => state.result.result);
    useEffect(() => {
        // Add an event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Function to handle beforeunload event
    const handleBeforeUnload = (e) => {
        // Display a confirmation message when the user tries to reload the page
        e.preventDefault();
        e.returnValue = '';
    };

    const onPrev = () => {
        dispatch(MovePrevQuestion());
    }

    const onNext = () => {
        dispatch(MoveNextQuestion());
        if (result.length <= trace) {
            dispatch(PushAnswer(option));
            setOption(null);
        }
    }

    const handleSubmit = () => {
        if (result.length <= trace) {
            dispatch(PushAnswer(option));
        }
        navigate('/results', { replace: true });
    }

    const onCheck = (i) => {
        setOption(i);
    }

    return (
        <div className='container'>
            <h2 className='title text-light'>Quiz Application</h2>
            <Question onCheck={onCheck} />
            <div className='temp'>
                {trace>0? (
                    <button className='btn prev' onClick={onPrev}>
                        Prev
                    </button>
                ) : (
                    <div></div>
                )}
                {trace<29 ? (
                    <button className='btn next' onClick={onNext}>
                        Next
                    </button>
                ) : (
                    <button className='btn prev' onClick={handleSubmit}>
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Quiz;
