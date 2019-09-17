import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialCreds = {
    username: "",
    password: ""
};

const Login = (props) => {
    const [creds, setCreds] = useState(initialCreds);
    const [error, setError] = useState();
    const handleChange = e => setCreds({...creds, [e.target.name]: e.target.value});
    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/login', creds)
        .then(res => console.log(res))
        .catch(err => {
            console.log(err.response)
            setError(err.response.data.message)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div>{error}</div>}
            <input 
            placeholder= "username"
            name= "username"
            value={creds.username}
            onChange={handleChange}
            />
            <input
            type= "password"
            placeholder= "password"
            name= "password"
            value={creds.password}
            onChange={handleChange}
            />
            <button
            type="submit">Login</button>
        </form>

    );
};

export default Login;