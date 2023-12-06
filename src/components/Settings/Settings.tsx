import React from 'react';
import s from '../Counter.module.css';
import {Setting} from './Setting/Setting';
import {Button} from '../Button/Button';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {CounterRootStateType} from '../../state/store';
import {hasErrorAC, setMaxValueAC, setStartValueAC} from '../../state/counter-reducer';

type SettingsType = {}


const Settings = (props: SettingsType) => {

    const dispatch = useDispatch()
    const maxValueSelector = useSelector<CounterRootStateType, number>(state => state.display.maxValue)
    const startValueSelector = useSelector<CounterRootStateType, number>(state => state.display.startValue)
    const hasErrorSelector = useSelector<CounterRootStateType, boolean>(state => state.display.error)
    console.log("hasErrorSelector", hasErrorSelector)

    if (maxValueSelector === startValueSelector || maxValueSelector < startValueSelector ) {
        console.log('проверка сработала')
        dispatch(hasErrorAC(true))
    }
    else{
        dispatch(hasErrorAC(false))
    }

    const maxValueHandler = (value: number) => {
        dispatch(setMaxValueAC(value))
    }

    const startValueHandler = (value: number) => {
        dispatch(setStartValueAC(value))
    }

    return (
        <div className={s.box}>
            <div className={s.settings}>
                <Setting value={maxValueSelector} callback={maxValueHandler} name={'maxValue:'}
                         hasError={hasErrorSelector}/>
                <Setting value={startValueSelector} callback={startValueHandler} name={'startValue:'}
                         hasError={hasErrorSelector}/>
            </div>
            <div className={`${s.btnContainer} ${s.jcCenter}`}>
                <NavLink to={'/screen'}><Button callback={() => {
                }} name={'set'} dis={hasErrorSelector}/></NavLink>
            </div>
        </div>
    );
};

export default Settings;