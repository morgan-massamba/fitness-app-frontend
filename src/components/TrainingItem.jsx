import React from 'react';
import '../styles/trainingItem.scss';

const TrainingItem = ({ title, numberOfExercices, level, handleClick }) => {
    return (
        <div className="training-item" onClick={handleClick}>
            <p className="training-item__title">{title}</p>
            <p className="training-item__content">
                {numberOfExercices} exercice{numberOfExercices > 1 ? 's' : ''}
            </p>
            <p className="training-item__level">
                Niveau :
                {level === 1
                    ? ' Débutant'
                    : level === 2
                    ? ' Confirmé'
                    : ' Expert'}
            </p>
            <div className="overlay"></div>
        </div>
    );
};

export default TrainingItem;
