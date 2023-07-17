import React, {useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {Button} from "./Button";
import {Setting} from "./Setting";
import {log} from "util";


const Counter = () => {
    const INITIAL_START_VALUE = 0
    const INITIAL_MAX_VALUE = 5

    const [counter, setCounter] = useState(0)
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
    const [isError, setIsError] = useState(false)
    const [textError, setTextError] = useState("")
    const [disabledSetBtn, setDisabledSetBtn]=useState(true)
    const [disabledResetBtn, setDisabledResetBtn]=useState(false)
    const [disabledIncBtn, setDisabledIncBtn]=useState(false)
    console.log("textError" , textError)
    console.log("! textError" , !textError)
    console.log("!! textError" , !!textError)

    const startValueHandler = (value: number) => setStartValue(value)

    const maxValueHandler = (value: number) => setMaxValue(value)

    useEffect(() => {
        if (maxValue !=INITIAL_MAX_VALUE || startValue !=INITIAL_START_VALUE) {
            setIsError(true)
            setTextError("enter values and press 'set'")
            setDisabledSetBtn(false)
            setDisabledResetBtn(true)
            setDisabledIncBtn(true)
        }
        if (maxValue === startValue || maxValue < startValue) {
            setIsError(true)
            setTextError("incorrect value!")
            setDisabledResetBtn(true)
            setDisabledIncBtn(true)
        }
    }, [maxValue, startValue])

    const incHandler = () => counter < maxValue && setCounter(counter + 1)

    const resetBtnHandler = () => {
        let startValueAsString = localStorage.getItem("startValue")
        if(startValueAsString){
            setCounter(JSON.parse(startValueAsString))
        } else{
            setCounter(0)
        }


    }

    const setToLocalStorageHandler = () => {
        localStorage.setItem("maxValue", JSON.stringify(maxValue))
        localStorage.setItem("startValue", JSON.stringify(startValue))
        setIsError(false)
        setCounter(startValue)
        setDisabledResetBtn(false)
        setDisabledIncBtn(false)
        setTextError("") // если сетнули, текст ошибки обнулился

    }


    return (
        <div className={s.container}>
            <div>
                <Setting value={INITIAL_MAX_VALUE} callback={maxValueHandler} name={"maxValue"}/>
                <Setting value={INITIAL_START_VALUE} callback={startValueHandler} name={"startValue"}/>
                <Button callback={setToLocalStorageHandler} name={"set"} dis={disabledSetBtn}/>
            </div>


            <div>
                <div>
                    {isError ? <div>{textError}</div> : <div>{counter}</div>}
                </div>
                <div>
                    <Button callback={incHandler} name={"inc"} dis={counter===maxValue || disabledIncBtn}/>
                    <Button callback={resetBtnHandler} name={"reset"} dis={disabledResetBtn}/>
                </div>
            </div>


        </div>
    );
};

export default Counter;


{/*<div className={counter < maxCountValue ? "" : s.error}>{counter}</div>*/
}