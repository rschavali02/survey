import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import AuthPage from './components/auth/authpage';
import { AuthProvider } from './context/authcontext';
import ProtectedRoute from './components/protected';
import NewSurveyPage from './components/survey/newSurveyPage.tsx';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    {/*New Survey Page */}
                    <Route 
                        path="/new-survey"
                        element={
                            <ProtectedRoute>
                                <NewSurveyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/auth" element={<AuthPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;