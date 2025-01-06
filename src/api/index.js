import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4000/api', 
    withCredentials: true,
});


export const fetchSurveys = () => API.get('/surveys');
export const createSurvey = (surveyData) => API.post('/surveys', surveyData);
export const login = (username, password) => API.post('/auth/login/password', { username, password });
export const signup = (username, password) => API.post('/auth/signup', { username, password });
export const logout = () => API.post('/auth/logout');

export default API;