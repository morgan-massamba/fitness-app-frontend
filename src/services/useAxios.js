import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { toast } from 'react-toastify';

const useAxios = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://127.0.0.1:5000',
    });

    instance.interceptors.request.use(
        function (config) {
            if (user) {
                config.headers['Authorization'] = `Bearer ${user}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (
                error.response?.status === 401 &&
                error.response?.data?.message === 'jwt invalid'
            ) {
                toast.error('Vous avez été déconnecté.', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                localStorage.removeItem('user');
                setUser(null);
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAxios;
