import React from 'react';
import '../styles/exercises.scss';

const Exercises = () => {
    return (
        <div className="exercise-list">
            <h2 className="heading">Liste des exercises</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Catégorie</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Developpé couché</td>
                        <td>Pectoraux</td>
                    </tr>
                    <tr>
                        <td>Tirage nuque</td>
                        <td>Dos</td>
                    </tr>
                    <tr>
                        <td>Squat</td>
                        <td>Jambes</td>
                    </tr>
                    <tr>
                        <td>Curl biceps</td>
                        <td>Bras</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Exercises;
