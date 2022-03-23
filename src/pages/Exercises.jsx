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
                        <td>
                            <span className="name">Developpé couché</span>
                        </td>
                        <td>
                            <span className="categorie bg-green">
                                Pectoraux
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="name">Tirage nuque</span>
                        </td>
                        <td>
                            <span className="categorie bg-yellow">Dos</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Squat</td>
                        <td>
                            <span className="categorie bg-red">Jambes</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Curl biceps</td>
                        <td>
                            <span className="categorie bg-blue">Bras</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Exercises;
