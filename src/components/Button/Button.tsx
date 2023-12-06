import React from 'react';
import s from "./Button.module.css"


type  ButtonType = {
    callback: () => void
    name: string
    dis: boolean
}

export const Button = ({callback, name, dis}: ButtonType) => {

    return (
        <button onClick={callback} disabled={dis} className={s.btn}>
            {name}
        </button>
    );
};
