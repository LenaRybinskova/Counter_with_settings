import React, {useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button/Button";
import {Setting} from "./Setting/Setting";
import {Display} from "./Display/Display";



type InfoMessageType = "incorrect value!" | "enter values and press 'set'" | ""


const Counter = () => {

    const [display, setDisplay] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(5)
    const [startValue, setStartValue] = useState<number>(0)

    const [infoMessage, setInfoMessage] = useState<InfoMessageType>("")
    const [isSetBtnDisabled, setIsSetBtnDisabled] = useState(true)
    const [isEditMode, setEditMode] = useState(false)

    const HAS_ERROR = infoMessage === "incorrect value!"

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


    useEffect(() => {
        let startValueAsString = localStorage.getItem("startValue")
        let maxValueAsString = localStorage.getItem("maxValue")

        if (startValueAsString && maxValueAsString) {
            setDisplay(JSON.parse(startValueAsString))
            setStartValue(JSON.parse(startValueAsString))
            setMaxValue(JSON.parse(maxValueAsString))
        } else {
            setDisplay(0)
        }
    }, []);


    return (
        <div className={s.container}>
            <div className={s.box}>
                <div className={s.settings}>
                    <Setting value={maxValue} callback={maxValueHandler} name={"maxValue:"} styleError={HAS_ERROR}/>
                    <Setting value={startValue} callback={startValueHandler} name={"startValue:"}
                             styleError={HAS_ERROR}/>
                </div>
                <div className={`${s.btnContainer} ${s.jcCenter}`}>
                    <Button callback={setToLocalStorageHandler} name={"set"} dis={isSetBtnDisabled}/>
                </div>
            </div>

            <div className={s.box}>
                <div className={`${s.settings} ${s.text}`}>
                    <Display isEditMode={isEditMode} display={display} maxValue={maxValue}
                             infoMessage={infoMessage}/>
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