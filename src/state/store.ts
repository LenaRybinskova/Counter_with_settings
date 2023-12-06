import {combineReducers, createStore} from 'redux';
import { counterReducer} from './counter-reducer';

const rootReducer = combineReducers({
    display: counterReducer
})

export const store = createStore(rootReducer)

export type CounterRootStateType = ReturnType<typeof rootReducer>