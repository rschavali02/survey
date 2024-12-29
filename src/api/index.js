import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000/api' });

export const fetchSurveys = () => API.get('/surveys');
export const createSurvey = (surveyData) => API.post('/surveys', surveyData);

export default API;