import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './carousel.css';

const Carousel = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch survey templates from the API

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/templates'); 
                setTemplates(response.data); 
            } catch (err) {
                setError('no available templates');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    return (
        <div className="carousel-container">
            <h2 className="carousel-title">Make Better Surveys</h2>
            <div className="carousel">
                {/* Blank survey card */}
                <div className="carousel-item new-survey">
                    <p>Blank Survey</p>
                </div>
                {/* Render templates */}
                {loading ? (
                    <p>Loading templates...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : templates.length > 0 ? (
                    templates.map((template, index) => (
                        <div key={index} className="carousel-item">
                            <img className="template-image" src={template.image} alt={template.title} />
                            <p>{template.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No templates available</p>
                )}
            </div>
        </div>
    );
};

export default Carousel;