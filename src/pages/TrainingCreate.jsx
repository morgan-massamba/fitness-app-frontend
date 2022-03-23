import React, { useState } from 'react';
import '../styles/trainingCreate.scss';
import { IoMdRemoveCircle } from 'react-icons/io';

const TrainingCreate = () => {
    const [trainingTitle, setTrainingTitle] = useState('');
    const [formData, setFormData] = useState([
        {
            title: '',
            sets: 1,
            reps: 10,
        },
    ]);

    const addExerciseItem = () => {
        setFormData([...formData, { title: '', sets: 1, reps: 10 }]);
    };

    const removeExerciseItem = (index) => {
        const copyFormData = [...formData];

        copyFormData.splice(index, 1);

        setFormData(copyFormData);
    };

    const handleChange = ({ target: { name, value } }, index) => {
        const copyFormData = [...formData];

        formData[index][name] = value;

        setFormData(copyFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle submit', formData);
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
                        <select>
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
                                name="title"
                                id="exercise"
                                value={element.title}
                                onChange={(e) => handleChange(e, index)}
                            >
                                <option value="">Choisissez un exercice</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="hamster">Hamster</option>
                                <option value="parrot">Parrot</option>
                                <option value="spider">Spider</option>
                                <option value="goldfish">Goldfish</option>
                            </select>
                        </div>
                        <div className="group-item-flex__sets">
                            <label htmlFor="sets">Séries</label>
                            <input
                                type="number"
                                name="sets"
                                id="sets"
                                required
                                min={0}
                                max={20}
                                value={element.sets}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                        <div className="group-item-flex__reps">
                            <label htmlFor="reps">Répétitions</label>
                            <input
                                type="number"
                                name="reps"
                                id="reps"
                                required
                                min={0}
                                max={50}
                                value={element.reps}
                                onChange={(e) => handleChange(e, index)}
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
