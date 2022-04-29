import React, { useEffect, useState } from 'react';
import '../styles/trainingCreate.scss';
import { IoMdRemoveCircle } from 'react-icons/io';
import useAxios from '../services/useAxios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TrainingCreate = () => {
    let axiosInstance = useAxios();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [level, setLevel] = useState('Débutant');
    const [trainingTitle, setTrainingTitle] = useState('');
    const [formData, setFormData] = useState([
        {
            exerciseId: '',
            sets: 1,
            reps: 10,
        },
    ]);

    useEffect(() => {
        //LOADING EXERCISES FOR SELECT <option></option>
        const loadData = async () => {
            try {
                const result = await axiosInstance.get('exercises/list');
                setExercises(result?.data);
            } catch (error) {
                console.log(error);
                setExercises([]);
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };
        loadData();
    }, []);

    const addExerciseItem = () => {
        setFormData([...formData, { exerciseId: '', sets: 1, reps: 10 }]);
    };

    const removeExerciseItem = (index) => {
        const copyFormData = [...formData];

        copyFormData.splice(index, 1);

        setFormData(copyFormData);
    };

    const handleChange = ({ target: { name, value } }, index, type) => {
        const copyFormData = [...formData];

        //Reformater au type number quand on change les valeurs dans le formulaire
        if (type === 'number') {
            copyFormData[index][name] = Number(value);
        } else {
            copyFormData[index][name] = value;
        }

        setFormData(copyFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTrainingContent = {
            title: trainingTitle,
            level: level,
            exercises: formData,
        };
        try {
            const result = await axiosInstance.post(
                'trainings/create',
                newTrainingContent
            );

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
    return (
        <div className="training-create" onSubmit={handleSubmit}>
            <h2 className="heading">Créer ton entrainement !</h2>
            <form>
                <div className="group-item group-item__row">
                    <div className="group-item__title">
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            id="title"
                            required
                            value={trainingTitle}
                            onChange={(e) => setTrainingTitle(e.target.value)}
                            placeholder="Titre de l'entrainement"
                        />
                    </div>
                    <div className="group-item__level">
                        <label htmlFor="level">Niveau</label>
                        <select
                            id="level"
                            name="level"
                            required
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            <option value="Débutant">Débutant</option>
                            <option value="Confirmé">Confirmé</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                </div>
                {formData.map((element, index) => (
                    <div className="group-item group-item-flex" key={index}>
                        <div className="group-item-flex__exercise">
                            <label htmlFor="exercise">Exercice</label>
                            <select
                                name="exerciseId"
                                id="exercise"
                                required
                                value={element.exerciseId}
                                onChange={(e) =>
                                    handleChange(e, index, 'number')
                                }
                            >
                                <option value="">Choisissez un exercice</option>
                                {exercises.map((i) => (
                                    <option value={i.id} key={i.id}>
                                        {i.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="group-item-flex__sets">
                            <label htmlFor="sets">Séries</label>
                            <input
                                type="number"
                                name="sets"
                                id="sets"
                                required
                                min={1}
                                max={20}
                                value={element.sets}
                                onChange={(e) =>
                                    handleChange(e, index, 'number')
                                }
                            />
                        </div>
                        <div className="group-item-flex__reps">
                            <label htmlFor="reps">Répétitions</label>
                            <input
                                type="number"
                                name="reps"
                                id="reps"
                                required
                                min={1}
                                max={50}
                                value={element.reps}
                                onChange={(e) =>
                                    handleChange(e, index, 'number')
                                }
                            />
                        </div>
                        {index ? (
                            <IoMdRemoveCircle
                                className="remove-icon"
                                onClick={() => removeExerciseItem(index)}
                            />
                        ) : null}
                    </div>
                ))}

                <div className="group-item">
                    <button
                        type="button"
                        className="action-btn add-btn"
                        onClick={addExerciseItem}
                    >
                        Ajouter un exercice
                    </button>
                    <button type="submit" className="action-btn submit-btn">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TrainingCreate;
