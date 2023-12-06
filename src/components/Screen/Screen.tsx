import React from 'react';
import {Display} from './Display/Display';
import {Button} from '../Button/Button';
import s from '../Counter.module.css'
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {incrementAC, resetAC} from '../../state/counter-reducer';
import {CounterRootStateType} from '../../state/store';


type ScreenType = {}


const Screen = (props: ScreenType) => {

    const dispatch = useDispatch()
    const currentValueSelector = useSelector<CounterRootStateType,number>(state => state.display.currentValue)
    const startValueSelector = useSelector<CounterRootStateType, number>(state => state.display.startValue)
    const maxValueSelector=useSelector<CounterRootStateType,number>(state=>state.display.maxValue)

    const navigate = useNavigate()

    const incHandler = () => {
        if (currentValueSelector < maxValueSelector) {
            dispatch(incrementAC())
            console.log('incHandler')
        }
    }

    const resetBtnHandler = () => {
        dispatch(resetAC())
    }

    return (
        <div className={s.box}>
            <div className={`${s.settings} ${s.text}`}>
                <Display
                    // тут стартовые не подтягиваются
                    display={currentValueSelector}
                    maxValue={maxValueSelector}
                />
            </div>
            <div className={`${s.btnContainer} ${s.jcSpaceBetween}`}>
                <Button callback={incHandler} name={'inc'} dis={currentValueSelector === maxValueSelector}/>
                <Button callback={resetBtnHandler} name={'reset'} dis={false}/>
                <Button callback={() => {navigate('/settings')}} name={'set'} dis={false}/>
            </div>
        </div>
    );
};

export default Screen;