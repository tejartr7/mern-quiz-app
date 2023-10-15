import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logo } from '../images/assets'; // Import the logo image correctly
import { NavLink } from 'react-router-dom'; // Import NavLink for routing

const Header = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);
    const [small, setSmall] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1000) {
                setSmall(true);
            } else {
                setSmall(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSignout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
        enqueueSnackbar('Signout successful', { variant: 'success' });
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="blue" variant="light">
            <Container className="fw-bold">
                <img className="logo" src={logo} alt="Logo" />
                {small ? (
                    <Button
                        variant="dark"
                        onClick={handleSignout}
                        className="text-white"
                    >
                        Logout
                    </Button>
                ) : null}
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="responsive-navbar-nav" in={expanded}>
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to="/" exact>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/about">
                            About
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">
                            Contact us!
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {!small ? (
                    <Button
                        variant="dark"
                        onClick={handleSignout}
                        className="text-white"
                    >
                        Logout
                    </Button>
                ) : null}
            </Container>
        </Navbar>
    );
}

export default Header;
