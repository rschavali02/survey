import React, { useState, useContext } from 'react';
import AuthContext from '../../context/authcontext';
import './authpage.css';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { handleSignup, handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setUsername('');
        setPassword('');
    };

    const onSubmit = async (e) => {
       
        e.preventDefault();
            if (isLogin) {
                await handleLogin(username, password);
                navigate('/'); // Redirect to home after login
            } else {
                await handleSignup(username, password);
                navigate('/'); // Redirect to home after signup
            }
    };
    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <p className="toggle-link">
                {isLogin ? (
                    <>
                        Don't have an account?{' '}
                        <span onClick={toggleMode}>Signup</span>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <span onClick={toggleMode}>Login</span>
                    </>
                )}
            </p>
        </div>
    );
};

export default AuthPage;