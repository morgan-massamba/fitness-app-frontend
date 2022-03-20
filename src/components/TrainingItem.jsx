import React from 'react';
import '../styles/trainingItem.scss';

const TrainingItem = ({ title, numberOfExercices, time, handleClick }) => {
    return (
        <div className="training-item" onClick={handleClick}>
            <p className="training-item__title">{title}</p>
            <p className="training-item__content">
                {numberOfExercices} exercice{numberOfExercices > 1 ? 's' : ''}
            </p>
            <p className="training-item__time">Durée : {time}</p>
            <div className="overlay"></div>
        </div>
    );
};

export default TrainingItem;
