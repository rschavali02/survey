import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleSignup = async (username, password) => {
        try {
          const response = await axios.post('http://localhost:4000/api/auth/signup', {
            username,
            password,
          });
          setUser(response.data.user);
        } catch (error) {
          if (error.response && error.response.data) {
            console.error('Signup failed:', error.response.data.error); // Log the error message from the backend
            alert(error.response.data.error); // Show error message to the user
          } else {
            console.error('Signup failed:', error);
          }
        }
      };

    const handleLogin = async (username, password) => {
        setUser({ username });
    };

    const handleLogout = async () => {
        try {
          const response = await axios.post('http://localhost:4000/api/auth/logout');
          console.log(response.data.message); // Optional: Log the success message
          setUser(null);
          localStorage.removeItem('user'); // Clear user session from storage
          window.location.href = '/'; // Redirect to the authentication page
        } catch (error) {
          console.error('Logout failed:', error.response?.data || error.message);
        }
    };
    return (
        <AuthContext.Provider value={{ user, handleSignup, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;