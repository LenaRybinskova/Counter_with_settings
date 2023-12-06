import React from 'react';
import s from './Counter.module.css'
import Screen from './Screen/Screen';
import Settings from './Settings/Settings';
import {Routes, Route, Navigate} from 'react-router-dom';



const Counter = () => {

    return (
        <div className={s.container}>
            <Routes>
                <Route path={'/'} element={<Navigate to={'/screen'}/>}/>
                <Route path={'/settings'} element={<Settings/>}/>
                < Route path={'/screen'} element={<Screen/>}/>
            </Routes>
        </div>
    );
};

export default Counter;


