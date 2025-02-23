import axios from 'axios';
import React, { useState } from 'react';

import '../styles/SignUp.css';
import {Link, useNavigate} from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.email || !formData.password) {
            alert("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setError('');
        axios.post('http://localhost:8082/api/users', formData)
            .catch(error => {
                console.error('There was an error!', error);
                if (error.response && error.response.data.message === 'Email or Phone Number already in use.') {
                    setError('This email or phone number is already registered. Please use a different one.');
                } else {
                    setError('Registration failed. Please try again.');
                }
            })
            .then(response => {
                const userId = response.data.userId;
                sessionStorage.setItem('userId', userId);
                localStorage.setItem('userId', userId);
                console.log(userId)
                console.log(response.data)
                console.log(sessionStorage, 'hiiii')
                alert("User registered successfully!");
                window.location.href = "/create_bucket";
                console.log(sessionStorage, 'hiiii')
            })

            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-header">
                <h1>Sign Up Page</h1>
                <p>This is the Sign Up page.</p>
            </div>
            <div className="signup-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Display error message */}
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
