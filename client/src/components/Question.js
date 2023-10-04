import React, { useEffect, useState } from 'react';
import '../styles/app.css';
import data from '../database/data';
import { useSelector } from 'react-redux';
import { useFetchQestion } from '../hooks/fetch';
import { useDispatch } from 'react-redux';
import { updateResultAction } from '../redux/result_reducer';
import { updateResult } from '../hooks/setResult';

export default function Question({ onCheck }) {
  const [selectedOption, setSelectedOption] = useState(null);
  //  const question = data; // Assuming you want the first question from your data
  const [{ isLoading, apiData, serverError }] = useFetchQestion();
  const questions = useSelector((state) => state.questions.queue[state.questions.trace]);
  const trace = useSelector((state) => state.questions.trace);
  const result = useSelector(state => state.result.result);
  // Check if questions.queue is available before accessing it
  const firstQuestion = questions;
  const [checked, setChecked] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(option);
   // console.log(result);
    dispatch(updateResult({ trace, checked }))
  }, [checked])

  const onselect = (i) => {
    onCheck(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (serverError) return <div>{serverError.message}</div>;

  return (
    <div className='questions'>
      {firstQuestion && (
        <>
          <h2 className='text-light'>{firstQuestion.question}</h2>
          <ul key={firstQuestion.id}>
            {firstQuestion.options.map((q, i) => (
              <li key={i}>
                <input
                  type="radio"
                  value={false}
                  name="options"
                  id={`q${i}-option`}
                  onChange={() => onselect(i)}
                />
                <label className='label-text' htmlFor={`q${i}-option`}>{q}</label>
                <div className={`check ${result[trace]==i? 'checked' : ''}`}></div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}