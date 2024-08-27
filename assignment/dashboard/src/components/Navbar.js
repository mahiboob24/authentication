import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Link to="/" className="navbar-brand">MyApp</Link>
       
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-item"><FaHome /> Home</Link></li>
          {!isLoggedIn && <li><Link to="/login" className="navbar-item"><FaSignInAlt /> Login</Link></li>}
          {!isLoggedIn && <li><Link to="/register" className="navbar-item"><FaUserPlus /> Register</Link></li>}
          {isLoggedIn && <li><Link to="/dashboard" className="navbar-item"><FaTachometerAlt /> Dashboard</Link></li>}
          {isLoggedIn && <li><button onClick={onLogout} className="navbar-button"><FaSignOutAlt /> Logout</button></li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
