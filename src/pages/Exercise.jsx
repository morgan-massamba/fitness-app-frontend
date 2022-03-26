import React from 'react';
import { useParams } from 'react-router-dom';

import '../styles/exercise.scss';

const ExerciseItem = () => {
    const { id } = useParams();

    return (
        <div className="exercise">
            <h2 className="exercise__heading">Exercice {id}</h2>
            <p className="exercise__description">
                Le squat est un exercice pour le renforcement musculaire du bas
                du corps. Il peut se faire sans ajouter de résistance (appelé
                alors squat au poids du corps ou air squat) ou avec des poids
                comme des haltères (le squat barre arrière ou back squat et le
                squat avant ou front squat sont des variantes du squat à la
                barre).
            </p>
        </div>
    );
};

export default ExerciseItem;
