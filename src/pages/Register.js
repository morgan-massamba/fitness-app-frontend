import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../services/useAuth';
import useAxios from '../services/useAxios';

const Register = () => {
    let axiosInstance = useAxios();

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return <div>Register</div>;
};

export default Register;
