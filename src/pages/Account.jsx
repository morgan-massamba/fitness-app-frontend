import React, { useState } from 'react';
import '../styles/account.scss';

const Account = () => {
    const [formData, setForm] = useState({
        firstname: 'Morgan',
        lastname: 'Massamba',
        email: 'chabcontact@gmail.com',
        age: '',
        weight: '',
        height: '',
    });
    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submited', formData);
    };
    return (
        <div className="account" onSubmit={handleSubmit}>
            <h2 className="heading">Mon compte</h2>
            <form>
                <div className="group-item">
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Prénom"
                        required
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            value={formData.height}
                        />
                    </div>
                </div>
                <div className="group-item">
                    <button type="submit" className="submit-btn">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Account;
