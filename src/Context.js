import React, { createContext, useState } from 'react';

export const Context = createContext()

export default function ContextProvider(props) {

    const [stopTime, setStopTime] = useState(false)
    const [workout,setWorkout] = useState(false)

    const arr = [
        [stopTime,setStopTime],
        [workout,setWorkout]
    ];

    return (
        <Context.Provider value={{
            var1:[stopTime,setStopTime],
            var2:[workout,setWorkout]
        }}>
            {props.children}
        </Context.Provider>
    )
}