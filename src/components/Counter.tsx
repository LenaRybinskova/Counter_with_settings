import React, {useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button/Button";
import {Setting} from "./Setting/Setting";
import {Display} from "./Display/Display";


// сократила кол-в стейтов, данные загр из локалСтор, все работает
const Counter = () => {
    const INITIAL_START_VALUE = 0
    const INITIAL_MAX_VALUE = 5

    const [display, setDisplay] = useState(() => {
        let startValueAsString = localStorage.getItem("startValue")
        if (startValueAsString) {
            let startValueFromLStorage = JSON.parse(startValueAsString)
            return startValueFromLStorage
        } else {
            return INITIAL_START_VALUE
        }
    })
    const [maxValue, setMaxValue] = useState(() => {
        let maxValueAsString = localStorage.getItem("maxValue")
        if (maxValueAsString) {
            let maxValueFromLStorage = JSON.parse(maxValueAsString)
            return maxValueFromLStorage
        } else {
            return INITIAL_MAX_VALUE
        }
    })
    const [startValue, setStartValue] = useState(() => {
        let startValueAsString = localStorage.getItem("startValue")
        if (startValueAsString) {
            let startValueFromLStorage = JSON.parse(startValueAsString)
            return startValueFromLStorage
        } else {
            return INITIAL_START_VALUE
        }
    })

    const [infoMessage, setInfoMessage] = useState("")
    const [isSetBtnDisabled, setIsSetBtnDisabled] = useState(true)
    const [isEditMode, setEditMode] = useState(false)

    function isIncorrectData() {
        if (maxValue === startValue || maxValue < startValue || startValue < 0 || maxValue < 0)
            return true
        if (!Number.isInteger(maxValue) ||
            !Number.isInteger(startValue)) {
            return true
        }
        return false
    }

    const startValueHandler = (value: number) => {
        setStartValue(value)
        setEditMode(true)
    }

    const maxValueHandler = (value: number) => {
        setMaxValue(value)
        setEditMode(true)
    }

    const incHandler = () => display < maxValue && setDisplay(display + 1)

    const resetBtnHandler = () => {
        let startValueAsString = localStorage.getItem("startValue")
        if (startValueAsString) {
            setDisplay(JSON.parse(startValueAsString))
        } else {
            setDisplay(0)
        }


    }

    const setToLocalStorageHandler = () => {
        localStorage.setItem("maxValue", JSON.stringify(maxValue))
        localStorage.setItem("startValue", JSON.stringify(startValue))
        setDisplay(startValue)
        setInfoMessage("") // если сетнули, текст ошибки обнулился
        setIsSetBtnDisabled(true)
        setEditMode(false)
    }

    useEffect(() => {
        if (isEditMode) {
            setInfoMessage("enter values and press 'set'")
            setIsSetBtnDisabled(false)
        }
        if (isIncorrectData()) {
            setInfoMessage("incorrect value!")
            setIsSetBtnDisabled(true)
        }
    }, [maxValue, startValue])

    return (
        <div className={s.container}>
            <div className={s.box}>
                <div className={s.settings}>
                    <Setting value={maxValue} callback={maxValueHandler} name={"maxValue:"} styleError={infoMessage === "incorrect value!"}/>
                    <Setting value={startValue} callback={startValueHandler} name={"startValue:"} styleError={infoMessage === "incorrect value!"}/>
                </div>
                <div className={`${s.btnContainer} ${s.jcCenter}`}>
                    <Button callback={setToLocalStorageHandler} name={"set"} dis={isSetBtnDisabled}/>
                </div>
            </div>

            <div className={s.box}>
                <div className={`${s.settings} ${s.text}`}>
                    <Display isEditMode={isEditMode} display ={display} maxValue={maxValue} infoMessage ={infoMessage}/>
                </div>
                <div className={`${s.btnContainer} ${s.jcSpaceBetween}`}>
                    <Button callback={incHandler} name={"inc"} dis={display === maxValue || !!infoMessage}/>
                    <Button callback={resetBtnHandler} name={"reset"} dis={!!infoMessage}/>
                </div>
            </div>
        </div>
    );
};

export default Counter;
