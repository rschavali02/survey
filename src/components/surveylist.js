import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/authcontext'; // Import AuthContext
import './surveylist.css';

const SurveyList = () => {
    const { user } = useContext(AuthContext); // Access the authenticated user
    const [userSurveys, setUserSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user-specific surveys from the API
    useEffect(() => {
        const fetchUserSurveys = async () => {
            try {
                setLoading(true);

                // Only fetch surveys if the user is authenticated
                if (user) {
                    const response = await axios.get(`http://localhost:4000/api/surveys?userId=${user.id}`);
                    setUserSurveys(response.data);
                } else {
                    setUserSurveys([]);
                }
            } catch (err) {
                setError('Failed to fetch surveys');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserSurveys();
    }, [user]);

    // Render content based on loading, error, and survey data
    if (loading) {
        return <p>Loading surveys...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (userSurveys.length === 0) {
        return (
            <div className="survey-list">
                <h2 className="list-title">Recent Surveys</h2>
            </div>
        );
    }

    return (
        <div className="survey-list">
            <h2 className="list-title">Your Surveys</h2>
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