import { useEffect, useState } from 'react';
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
            <div className="container-left">
                <div>
                    <h2>My Fitness App</h2>
                    <p>Discover a new way to organise your gym everyday !</p>
                </div>
            </div>
            <div className="container-right">
                <form onSubmit={handleSubmit}>
                    <h3 className="title">Connexion</h3>
                    <InputItem
                        handleChange={handleChange}
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Veuillez entrez votre email"
                        errorMessage="Veuillez entrer un email valide"
                    />
                    <InputItem
                        handleChange={handleChange}
                        label="Mot de passe"
                        type="password"
                        name="password"
                        pattern="^(?=.*[0-9])(?=.*[A-Z]).{8,}$"
                        placeholder="Veuillez entrez votre mot de passe"
                        errorMessage="Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 nombre."
                    />
                    <button className="btn-submit">Connexion</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
