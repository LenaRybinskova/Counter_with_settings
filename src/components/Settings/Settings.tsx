import React from 'react';
import s from '../Counter.module.css';
import {Setting} from './Setting/Setting';
import {Button} from '../Button/Button';
import {NavLink} from 'react-router-dom';

type SettingsType={
    maxValue:number
    startValue: number
    hasError:boolean
    startValueHandler:(startValue: number)=>void
    maxValueHandler:(maxValue:number)=>void
    setToLocalStorageHandler:()=>void
}


const Settings = (props:SettingsType) => {


    return (
            <div className={s.box}>
                <div className={s.settings}>
                    <Setting value={props.maxValue} callback={props.maxValueHandler} name={'maxValue:'} hasError={props.hasError}/>
                    <Setting value={props.startValue} callback={props.startValueHandler} name={'startValue:'}
                             hasError={props.hasError}/>
                </div>
                <div className={`${s.btnContainer} ${s.jcCenter}`}>
                    <NavLink to={'/screen'}><Button callback={props.setToLocalStorageHandler} name={'set'} dis={props.hasError}/></NavLink>
                </div>
            </div>
    );
};

export default Settings;