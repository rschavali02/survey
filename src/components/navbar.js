import React from 'react';
import './navbar.css';
import Search from './search';


// no functionality currently, placeholder
const Navbar = ({ profilePicture }) => {
    return (
        <header className="navbar">
            <button className="menu-btn">☰</button>
            <Search />
            <img className="profile-picture" src={profilePicture} alt="Profile" />
        </header>
    );
};

export default Navbar;