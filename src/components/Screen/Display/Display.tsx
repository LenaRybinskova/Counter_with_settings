import React from 'react';
import s from '../../Counter.module.css';

type DisplayType = {
    /*    isEditMode: boolean*/
    display: number
    maxValue: number
    /*    hasError: boolean*/
}

export const Display = ({display, maxValue}: DisplayType) => {

    /*    const setErrorMessage = hasError ? s.errorText : ''*/

    return (
        <div className={display === maxValue ? s.errorText : ''}>{display}</div>
    );
};

