import React, {useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button";
import {Setting} from "./Setting";
import {log} from "util";


// сократила кол-в стейтов, данные загр из локалСтор, НО постоянно выдает "enter values and press 'set'"
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


    const [textError, setTextError] = useState("")
    const [disabledSetBtn, setDisabledSetBtn] = useState(true)


    const startValueHandler = (value: number) => setStartValue(value)

    const maxValueHandler = (value: number) => setMaxValue(value)

    useEffect(() => {


        if (maxValue != INITIAL_MAX_VALUE || startValue != INITIAL_START_VALUE) {
            setTextError("enter values and press 'set'")
            setDisabledSetBtn(false)

        }
        if (maxValue === startValue || maxValue < startValue || startValue < 0 || maxValue < 0) {
            setTextError("incorrect value!")
            setDisabledSetBtn(true)
        }
    }, [maxValue, startValue])

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
        setTextError("") // если сетнули, текст ошибки обнулился
        setDisabledSetBtn(true)
    }

    return (
        <div className={s.container}>
            <div>
                <Setting value={maxValue} callback={maxValueHandler} name={"maxValue"}/>
                <Setting value={startValue} callback={startValueHandler} name={"startValue"}/>
                <Button callback={setToLocalStorageHandler} name={"set"} dis={disabledSetBtn}/>

            </div>

            <div>
                <div>
                    {textError ? <div>{textError}</div> : <div>{display}</div>}
                </div>
                <div>
                    <Button callback={incHandler} name={"inc"} dis={display === maxValue || !!textError}/>
                    <Button callback={resetBtnHandler} name={"reset"} dis={!!textError}/>
                </div>
            </div>


        </div>
    );
};

export default Counter;


{/*<div className={counter < maxCountValue ? "" : s.error}>{counter}</div>*/
}