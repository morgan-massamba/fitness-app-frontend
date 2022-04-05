import React, { useEffect, useState } from 'react';
import { BiArrowBack, BiDotsHorizontalRounded } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxios from '../services/useAxios';

import '../styles/training.scss';

const Training = () => {
    const { id } = useParams();
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    let axiosInstance = useAxios();

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    const deleteTraining = async (id) => {
        try {
            const result = await axiosInstance.delete('trainings/delete/' + id);

            const successMessage = result?.data?.message;

            if (successMessage) {
                toast.success(successMessage, {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }

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
                        <div className="single-training__header-action-wrapper">
                            <BiDotsHorizontalRounded
                                onClick={() => setOpenModal((c) => !c)}
                            />
                            <div
                                className={
                                    openModal
                                        ? 'delete-training-btn show'
                                        : 'delete-training-btn'
                                }
                            >
                                <button
                                    onClick={() => deleteTraining(training.id)}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
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
