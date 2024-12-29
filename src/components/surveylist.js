import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './surveylist.css';


// this isn't done. once we add auth, this wikl fetch the users specific u_id, and get all of their given surveys

//TODO: 
// get u_id
// update api routes to include get all surveys where u_id is___
// replace axios.get api route to new url


const SurveyList = () => {
    const [userSurveys, setUserSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Fetch user surveys from the API
    useEffect(() => {
        const fetchUserSurveys = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:4000/api/surveys'); 
                setUserSurveys(response.data); 
            } catch (err) {
                setError('Failed to fetch surveys');
                console.error(err);
            } finally {
                setLoading(false); 
            }
        };

        fetchUserSurveys();
    }, []);

    // Render content based on loading, error, and survey data
    if (loading) {
        return <p>Loading surveys...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (userSurveys.length === 0) {
        return <h2 className="list-title">recent surveys</h2>;
    }

    return (
        <div className="survey-list">
            {userSurveys.map((survey, index) => (
                <div key={index} className="survey-item">
                    <h3>{survey.title}</h3>
                    <p>{survey.description}</p>
                </div>
            ))}
        </div>
    );
};

export default SurveyList;