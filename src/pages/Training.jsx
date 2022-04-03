import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxios from '../services/useAxios';

const Training = () => {
    const { id } = useParams();
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);
    let axiosInstance = useAxios();

    useEffect(() => {
        const loadTraining = async () => {
            try {
                setLoading(true);

                const result = await axiosInstance.get('trainings/' + id);

                setTraining(result?.data);

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };
        loadTraining();
    }, [id]);

    return <div>Training numéro {id}</div>;
};

export default Training;
