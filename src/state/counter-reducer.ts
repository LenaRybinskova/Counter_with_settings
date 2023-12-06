const INCREMENT = 'INCREMENT'
const RESET = 'RESET'
const SET_MAX_VALUE = 'SET_MAX_VALUE'
const SET_START_VALUE = 'SET_START_VALUE'
const HAS_ERROR = 'HAS_ERROR'

const initialState = {
    currentValue:1,
    startValue: 1,
    maxValue: 5,
    error: false
}
export type InitialType = {
    currentValue: number,
    startValue: number,
    maxValue: number
    error: boolean
}


export type IncrementACType = ReturnType<typeof incrementAC>
export type ResetACType = ReturnType<typeof resetAC>
export type SetMaxValueACType = ReturnType<typeof setMaxValueAC>
export type SetStartValueACType = ReturnType<typeof setStartValueAC>
export type HasErrorACType = ReturnType<typeof hasErrorAC>

export type  ActionTypes = IncrementACType | ResetACType | SetMaxValueACType | SetStartValueACType | HasErrorACType

export const counterReducer = (state: InitialType = initialState, action: ActionTypes): InitialType => {
    switch (action.type) {
        case INCREMENT:
            return {...state, currentValue: state.currentValue + 1}
        case RESET:
            return {...state, currentValue: state.startValue}
        case SET_MAX_VALUE:
            return {...state, maxValue: action.value}
        case SET_START_VALUE:
            return {...state, startValue: action.value}
        case HAS_ERROR:
            return {...state, error: action.value}
        default:
            return state
    }
}

export const incrementAC = () => {
    return {
        type: INCREMENT
    } as const
}

export const resetAC = () => {
    return {
        type: RESET
    } as const
}

export const setMaxValueAC = (value: number) => {
    return {
        type: SET_MAX_VALUE,
        value
    } as const
}

export const setStartValueAC = (value: number) => {
    return {
        type: SET_START_VALUE,
        value
    } as const
}

export const hasErrorAC = (value:boolean) => {
    return {
        type: HAS_ERROR,
        value
    } as const
}