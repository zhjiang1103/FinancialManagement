import React from 'react';

import AuthNav from './auth-nav';
import PageNav from './PageNav';

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <AuthNav />
          {/* <PageNav/> */}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;