import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxios from '../services/useAxios';

import '../styles/training.scss';

const Training = () => {
    const { id } = useParams();
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);
    let axiosInstance = useAxios();

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    useEffect(() => {
        const loadTraining = async () => {
            try {
                setLoading(true);

                const result = await axiosInstance.get('trainings/' + id);

                if (result.data?.length > 0) {
                    setTraining(result.data[0]);
                } else {
                    setTraining(null);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setTraining(null);
                setLoading(false);
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };
        loadTraining();
    }, [id]);

    return (
        <div className="single-training">
            {!loading && training == null && (
                <div className="single-training__header">
                    <BiArrowBack
                        onClick={goBack}
                        className="single-training__header-icon"
                    />
                    <h2 className="single-training__header-heading">
                        Aucun exercise trouvé
                    </h2>
                </div>
            )}
            {!loading && training !== null && (
                <>
                    <div className="single-training__header">
                        <BiArrowBack
                            onClick={goBack}
                            className="single-training__header-icon"
                        />
                        <h2 className="single-training__header-heading">
                            {training.title}
                        </h2>
                    </div>

                    <h3 className="subtitle">Niveau {training.level}</h3>

                    {training.exercises.map((item, index) => (
                        <div
                            className="single-training__description"
                            key={index}
                        >
                            <div className="single-training__description-title">
                                <div className="exercise-index">
                                    Exercice {index + 1} :
                                </div>
                                <div>{item.title}</div>
                            </div>
                            <div className="single-training__description-content">
                                {item.sets} serie{item.sets > 1 ? 's' : ''} de{' '}
                                {item.reps} répétition{item.sets > 1 ? 's' : ''}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Training;
