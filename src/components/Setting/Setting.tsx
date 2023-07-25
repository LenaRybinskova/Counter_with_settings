import React, {ChangeEvent} from 'react';
import s from "./Setting.module.css"


type SettingType = {
    name: string
    value: number
    callback: (value: number) => void
    styleError: boolean
}

export const Setting = ({name, value, callback, styleError}: SettingType) => {

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(Number(e.currentTarget.value))
    }

    return (
        <div className={s.containerSetting}>
            <div className={s.text}>{name}</div>
            <input type="number" value={value} onChange={onchangeHandler} className={styleError ? s.error : ""}/>
        </div>
    );
};

