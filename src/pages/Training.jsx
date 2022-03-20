import React from 'react';
import { useParams } from 'react-router-dom';

const Training = () => {
    const { id } = useParams();
    return <div>Training numéro {id}</div>;
};

export default Training;
