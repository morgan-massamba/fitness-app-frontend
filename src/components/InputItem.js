import React, { useState } from 'react';
import '../styles/inputItem.scss';

const InputItem = ({
    handleChange,
    label,
    type = 'text',
    name,
    pattern,
    errorMessage = 'Ce champs est requis.',
    placeholder,
}) => {
    //PERMET DE FAIRE LA VALIDATION DES CHAMPS UNIQUEMENT APRES ON BLUR , sinon NOT UX friendly
    const [blured, setBlured] = useState(false);

    return (
        <div className="groupItem">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                onChange={handleChange}
                placeholder={placeholder}
                name={name}
                required
                pattern={pattern}
                onBlur={() => setBlured(true)}
                visited={blured.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    );
};

export default InputItem;
