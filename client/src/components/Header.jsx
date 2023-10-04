import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import { useSnackbar } from 'notistack';
import { logo } from '../images/assets';
const Header = () => {
    const { enqueueSnackbar } = useSnackbar(); // Move this line outside of useEffect

    const handleSignout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
        enqueueSnackbar('Signout successful', { variant: 'success' });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <img className="logo text-white" src={logo}/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse text-white" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="navbar-brand nav-link active text-white" href="/">Home</a>
                    <a className="navbar-brand nav-link text-white" href="/about">About</a>
                    <a className="navbar-brand nav-link text-white" href="/contact">Contact us</a>
                </div>
            </div>
            <div className="navbar-nav mr-10">
                <button className="btn btn-dark" onClick={handleSignout}>Signout</button>
            </div>
        </nav>
    );
}

export default Header;
