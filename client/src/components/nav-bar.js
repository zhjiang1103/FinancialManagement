import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthNav from './auth-nav';

import { FaHome, FaBook, FaUser } from 'react-icons/fa'
import { RiBook2Line } from 'react-icons/ri'
import { Link, BrowserRouter as Router } from 'react-router-dom'

const NavItem = ({ icon, children, to }) => (
  <li className="flex">
    <Link to={to} className="flex items-center text-white hover:text-gray-200 py-2 px-4 rounded-lg">
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  </li>
)

const Logo = ({ icon, text }) => (
  <div className="flex items-center">
    <span className="text-2xl mr-2">{icon}</span>
    <h1 className="text-xl font-semibold">{text}</h1>
  </div>
)

const NavBar = () => (
  
    <nav className="flex justify-between items-center bg-yellow-600 text-white py-4 px-6">
      <Logo icon={<RiBook2Line />} text="Financial Management" />
      <ul className="flex">
        <NavItem icon={<FaHome />} to="/">Goal</NavItem>
        <NavItem icon={<FaBook />} to="/transactions">Transactions</NavItem>
        <NavItem icon={<FaUser />} to="/report">Report</NavItem>
        <AuthNav />
      </ul>
    </nav>
 
)



export default NavBar;