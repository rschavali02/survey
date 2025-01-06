import React from 'react';
import './search.css'; 
import searchIcon from '../assets/searchicon.png';

const Search = () => {
    return (
        <div className="search-bar-container">
            <img 
                src={searchIcon} 
                alt="Search Icon" 
                className="search-bar-icon" 
            />
            <input
                type="text"
                className="search-bar-input"
                placeholder="Find Better Surveys"
                aria-label="Find Better Surveys"
            />
        </div>
    );
};


export default Search;