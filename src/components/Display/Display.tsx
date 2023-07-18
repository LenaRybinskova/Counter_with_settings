import React from 'react';
import s from "../Counter.module.css";

type DisplayType = {
    isEditMode: boolean
    display: number
    maxValue: number
    infoMessage: string
}

export const Display = ({isEditMode, display, maxValue, infoMessage}: DisplayType) => {

    const setErrorMessage = infoMessage === "incorrect value!" ? s.errorText : ""

    return (
        <div>
            {isEditMode
                ? <div className={setErrorMessage}>{infoMessage}</div>
                : <div className={display === maxValue ? s.errorText : ""}>{display}</div>}
        </div>
    );
};

