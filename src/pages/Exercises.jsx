import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxios from '../services/useAxios';
import '../styles/exercises.scss';

const Exercises = () => {
    let axiosInstance = useAxios();

    const navigate = useNavigate();

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await axiosInstance.get('exercises/list');
                setExercises(result.data);
            } catch (error) {
                console.log(error);
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };
        loadData();
    }, []);

    const showDetails = (id) => {
        navigate('/exercises/' + id);
    };

    return (
        <div className="exercise-list">
            <h2 className="heading">Liste des exercises</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Catégorie</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((i) => (
                        <tr key={i.id}>
                            <td>
                                <span className="name">{i.title}</span>
                            </td>
                            <td>
                                <span
                                    className={
                                        i.id === 1
                                            ? 'categorie bg-green'
                                            : i.id === 2
                                            ? 'categorie bg-yellow'
                                            : i.id === 3
                                            ? 'categorie bg-red'
                                            : 'categorie bg-blue'
                                    }
                                >
                                    {i.categorie}
                                </span>
                            </td>
                            <td className="details">
                                <span onClick={() => showDetails(i.id)}>
                                    Détails
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Exercises;
