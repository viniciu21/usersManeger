import './Logo.css';
import React from 'react';
import logo from '../../Assets/logo4.png';
import { Link } from 'react-router-dom';

function Logo(props) {
  return (
    <aside className="logo">
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
      </Link>
    </aside>
  );
}

export default Logo;
