import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputItem from '../components/InputItem';
import useAuth from '../services/useAuth';
import useAxios from '../services/useAxios';
import { toast } from 'react-toastify';
import '../styles/register.scss';

const Register = () => {
    let axiosInstance = useAxios();

    const [formData, setForm] = useState({
        firstname: '',
        lastname: '',
        age: null,
        email: '',
        password: '',
    });

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (
            !formData.firstname ||
            !formData.lastname ||
            !formData.age ||
            !formData.email ||
            !formData.password
        ) {
            return;
        }

        const body = { ...formData };
        body.age = parseInt(body.age);

        try {
            const result = await axiosInstance.post('auth/register', body);
            const successMessage = result?.data?.message;
            if (successMessage) {
                toast.success(successMessage, {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
            setForm({
                firstname: '',
                lastname: '',
                age: null,
                email: '',
                password: '',
            });
            navigate('/login');
        } catch (error) {
            const errorMessage = error?.response?.data?.error?.sqlMessage;
            if (errorMessage) {
                toast.error(errorMessage, {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            } else {
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...formData, [name]: value });
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="register">
            <div className="container-left">
                <div>
                    <h2>My Fitness App</h2>
                    <p>
                        Découvre une nouvelle façon d'organiser tes
                        entrainements !
                    </p>
                </div>
            </div>
            <div className="container-right">
                <form onSubmit={handleSubmit}>
                    <h3 className="title">Inscription</h3>
                    <InputItem
                        handleChange={handleChange}
                        label="Prénom"
                        name="firstname"
                        placeholder="Veuillez entrez votre prénom"
                    />
                    <InputItem
                        handleChange={handleChange}
                        label="Nom de famille"
                        name="lastname"
                        placeholder="Veuillez entrez votre nom de famille"
                    />
                    <InputItem
                        handleChange={handleChange}
                        label="Age"
                        name="age"
                        type="number"
                        min={1}
                        max={150}
                        placeholder="Veuillez entrez votre âge"
                        errorMessage="Veuillez saisir un âge correct."
                    />
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
                    <button className="btn-submit">S'inscrire</button>
                    <button
                        onClick={redirectToLogin}
                        type="button"
                        className="redirect-btn"
                    >
                        Déjà un compte ? Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
