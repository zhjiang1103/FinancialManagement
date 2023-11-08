import React from 'react';
import {  Link, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthNav from './auth-nav';


const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light navbar-with-background"> {/* Add a custom class */}
        <div className="container">
          <div className="navbar-brand logo" /> 
          <Link to = "/search">Search</Link>
          <Link to = "/">Home</Link>
          <Link to = "/recommendation">Recommendation</Link>
          <Link to = "/profile">Profile</Link>
          <AuthNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;