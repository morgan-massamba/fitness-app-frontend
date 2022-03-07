import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputItem from '../components/InputItem';
import useAuth from '../services/useAuth';
import useAxios from '../services/useAxios';
import '../styles/login.scss';

const Login = () => {
    let axiosInstance = useAxios();
    const { user } = useAuth();
    const [formData, setForm] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('handlesubmit', formData);
    };

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...formData, [name]: value });
    };

    return (
        <div className="container">
            <h2 className="title">Login</h2>
            <form onSubmit={handleSubmit}>
                <InputItem
                    handleChange={handleChange}
                    label="Email"
                    name="email"
                    placeholder="Veuillez entrez votre email"
                    errorMessage="Veuillez entrer un email valide"
                />
                <InputItem
                    handleChange={handleChange}
                    label="Email"
                    name="email"
                    placeholder="Veuillez entrez votre email"
                    errorMessage="Veuillez entrer un email valide"
                />
                <InputItem
                    handleChange={handleChange}
                    label="Email"
                    name="email"
                    placeholder="Veuillez entrez votre email"
                    errorMessage="Veuillez entrer un email valide"
                />
            </form>
        </div>
    );
};

export default Login;
