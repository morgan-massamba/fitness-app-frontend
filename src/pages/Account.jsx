import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../services/useAuth';
import useAxios from '../services/useAxios';
import '../styles/account.scss';

const Account = () => {
    let axiosInstance = useAxios();

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const [loading, setLoading] = useState(true);
    const [formData, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        age: '',
        weight: '',
        height: '',
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const result = await axiosInstance.get('user');

                if (result.data.length > 0) {
                    //SET USER
                    setForm(result.data[0]);
                } else {
                    setForm({
                        firstname: '',
                        lastname: '',
                        email: '',
                        age: '',
                        weight: '',
                        height: '',
                    });
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setForm({
                    firstname: '',
                    lastname: '',
                    email: '',
                    age: '',
                    weight: '',
                    height: '',
                });
                setLoading(false);
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };
        loadData();
    }, []);

    const handleChange = ({ target: { name, value } }, type) => {
        if (type === 'number') {
            setForm({ ...formData, [name]: Number(value) });
        } else {
            setForm({ ...formData, [name]: value });
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axiosInstance.put('user/update', formData);

            const successMessage = result?.data?.message;

            if (successMessage) {
                toast.success(successMessage, {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
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

    const deleteAccount = async () => {
        const wantToDelete = window.confirm(
            'Voulez vous vraiment supprimer votre compte de fa??on d??finitive ?'
        );

        if (!wantToDelete) return;

        try {
            const result = await axiosInstance.delete('user/delete');

            const successMessage = result?.data?.message;
            if (successMessage) {
                toast.success(successMessage, {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }

            localStorage.removeItem('user');

            setUser(null);

            navigate('/');
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
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

    return (
        <div className="account" onSubmit={handleSubmit}>
            <h2 className="heading">Mon compte</h2>
            {loading && <p>Loading...</p>}
            {!loading && (
                <>
                    <form>
                        <div className="group-item">
                            <label htmlFor="firstname">Pr??nom</label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Pr??nom"
                                required
                                onChange={(e) => handleChange(e)}
                                value={formData.firstname}
                            />
                        </div>
                        <div className="group-item">
                            <label htmlFor="lastname">Nom de famille</label>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Nom de famille"
                                id="lastname"
                                required
                                onChange={(e) => handleChange(e)}
                                value={formData.lastname}
                            />
                        </div>
                        <div className="group-item">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                name="email"
                                required
                                disabled
                                onChange={(e) => handleChange(e)}
                                value={formData.email}
                            />
                        </div>
                        <div className="group-item group-item-flex">
                            <div className="group-item-flex__age">
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    id="age"
                                    min={1}
                                    max={150}
                                    onChange={(e) => handleChange(e, 'number')}
                                    value={formData.age}
                                />
                            </div>
                            <div className="group-item-flex__weight">
                                <label htmlFor="weight">Poids (kg)</label>
                                <input
                                    type="number"
                                    id="weight"
                                    placeholder="Poids"
                                    name="weight"
                                    min={1}
                                    max={300}
                                    onChange={(e) => handleChange(e, 'number')}
                                    value={formData.weight}
                                />
                            </div>
                            <div className="group-item-flex__height">
                                <label htmlFor="height">Taille (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    id="height"
                                    placeholder="Taille"
                                    min={1}
                                    max={300}
                                    onChange={(e) => handleChange(e, 'number')}
                                    value={formData.height}
                                />
                            </div>
                        </div>
                        <div className="group-item">
                            <button type="submit" className="submit-btn">
                                Enregistrer
                            </button>
                        </div>
                        <div className="group-item">
                            <button
                                type="button"
                                className="delete-account-btn"
                                onClick={deleteAccount}
                            >
                                Supprimer mon compte
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default Account;
