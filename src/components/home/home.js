import React from 'react';
import Navbar from '../navbar';
import Carousel from '../carousel';
import SurveyList from '../surveylist';
import './home.css';

import defaultProfilePicture from '../../assets/fillerpfp.jpg';


//TODO: 
//once auth is added, check for user pfp, and add button functionality to the pfp in top right

const Home = () => {
    const profilePicture = defaultProfilePicture; 

    return (
        <div className="homepage">
            <Navbar profilePicture={profilePicture} />
            <Carousel/>
            <div className="survey-list-container">
                <SurveyList />
            </div>
        </div>
    );
};

export default Home;