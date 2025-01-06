import React, { useContext } from 'react';
import Navbar from '../navbar';
import Carousel from '../carousel';
import SurveyList from '../surveylist';
import AuthContext from '../../context/authcontext'; 
import './home.css';


import defaultProfilePicture from '../../assets/fillerpfp.jpg';


const Home = () => {
    const { user, handleLogout } = useContext(AuthContext); // Access user and logout function
    const profilePicture = user?.profilePicture || defaultProfilePicture; // Use user profile picture if available

    return (
        <div className="homepage">
            <Navbar profilePicture={profilePicture} />
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <Carousel />
            <SurveyList />
        </div>
    );
};

export default Home;