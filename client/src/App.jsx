import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Login from './Login/Login';
import Register from './Login/Register';
import About from './components/About'; // Import the About component
import './styles/app.css';
import Contact from './components/Contact';

function App() {
  // Initially, assume the user is not authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');
  //const username = localStorage.getItem('username');
  //console.log(username);
  useEffect(() => {
    // Check for authentication when the component mounts
    if (token != null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Redirect to the login page if not authenticated */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} /> {/* Allow access to /about for authenticated and unauthenticated users */}
        <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />} />
        <Route path="/results" element={<Result />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
