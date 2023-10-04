import React from 'react';
import Header from './Header';

const About = () => {
  return (
    <><Header /><div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
      <h1 className='title text-light'>About us</h1>
      <h3 className='text-light text-center'>
        Hey there, this is a quiz application where you can check your DSA theoretical skills. I suggest you take 3 tests, and based on the results, you can estimate whether you are good or not. If you get 80% in all the 3 tests, you have good theoretical knowledge of DSA. Practice coding questions, and you will be ready for interviews.
      </h3>
    </div></>
  );
};

export default About;
