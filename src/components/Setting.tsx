import React, {ChangeEvent} from 'react';


type SettingType ={
    name:string
    value:number
    callback:(value:number)=>void
}

export const Setting = ({name, value,callback}:SettingType) => {
    const onchangeHandler=(e: ChangeEvent<HTMLInputElement>)=>{
        callback(Number(e.currentTarget.value))
    }

    return (
        <div>
            <div>{name}</div>
            <input type="number" defaultValue={value} onChange={onchangeHandler}/>
        </div>
    );
};

