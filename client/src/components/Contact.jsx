import React from 'react';
import Header from './Header';

const Contact = () => {
  return (
    <><Header /><div className="container text-center mt-5">
      <h2 className="title text-light">Contact Us</h2>
      <p className="contact-text text-light">Feel free to connect with us:</p>
      <div className="row justify-content-center">
        <div className="col-md-3 mb-3">
          <a href="mailto:codworldrtr7@gmail.com" className="btn btn-primary btn-block">
            Email
          </a>
        </div>
        <div className="col-md-3 mb-3">
          <a href="https://twitter.com/raghu_rtr" className="btn btn-primary btn-block" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
      </div>
      <p className="contact-text text-light">Found any issue you can reach out to our team</p>
    </div></>
  );
};

export default Contact;
