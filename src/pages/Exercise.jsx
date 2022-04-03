import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxios from '../services/useAxios';
import { BiArrowBack } from 'react-icons/bi';
import '../styles/exercise.scss';

const ExerciseItem = () => {
    let axiosInstance = useAxios();
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const result = await axiosInstance.get('exercises/list/' + id);

                if (result.data.length > 0) {
                    setExercise(result.data[0]);
                } else {
                    setExercise(null);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setExercise(null);
                setLoading(false);
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };
        loadData();
    }, [id]);

    const goBack = () => {
        navigate('/exercises');
    };

    return (
        <div className="exercise">
            {!loading && exercise == null && (
                <div className="exercise__header">
                    <BiArrowBack
                        onClick={goBack}
                        className="exercise__header-icon"
                    />
                    <h2 className="exercise__header-heading">
                        Aucun exercise trouvé
                    </h2>
                </div>
            )}
            {!loading && exercise !== null && (
                <>
                    <div className="exercise__header">
                        <BiArrowBack
                            onClick={goBack}
                            className="exercise__header-icon"
                        />
                        <h2 className="exercise__header-heading">
                            {exercise.title}
                        </h2>
                    </div>
                    <p className="exercise__description">
                        {exercise.description}
                    </p>
                </>
            )}
        </div>
    );
};

export default ExerciseItem;
