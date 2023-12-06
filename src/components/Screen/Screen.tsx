import React, {useEffect, useState} from 'react';
import {Display} from './Display/Display';
import {Button} from '../Button/Button';
import s from '../Counter.module.css'
import {NavLink, useNavigate} from 'react-router-dom';


type ScreenType = {
    maxValue: number
    startValue: number
    display: number
/*    hasError: boolean*/
    callbackInc: (display: number) => void
}


const Screen = (props: ScreenType) => {
    const navigate = useNavigate()

    const incHandler = () => props.display < props.maxValue && props.callbackInc(props.display + 1)

    const resetBtnHandler = () => {
        let startValueAsString = localStorage.getItem('startValue')
        if (startValueAsString) {
            props.callbackInc(JSON.parse(startValueAsString))
        } else {
            props.callbackInc(0)
        }
    }

    return (
        <div className={s.box}>
            <div className={`${s.settings} ${s.text}`}>
                <Display
                    display={props.display}
                    maxValue={props.maxValue}
                />
            </div>
            <div className={`${s.btnContainer} ${s.jcSpaceBetween}`}>
                <Button callback={incHandler} name={'inc'} dis={props.display === props.maxValue}/>
                <Button callback={resetBtnHandler} name={'reset'} dis={false}/>
                <Button callback={() => {navigate('/settings')}} name={'set'} dis={false}/>
            </div>
        </div>
    );
};

export default Screen;