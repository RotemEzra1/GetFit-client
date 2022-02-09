import React, { useState, useRef, useEffect, useContext } from 'react'
import { useStopwatch } from 'react-timer-hook';
import { useNavigate } from "react-router-dom";

import { Context } from '../../Context';

import checkLogin from "../../checkLogin";
import Logo from "../assets/Logo"

const Timer = () => {

  let navigate = useNavigate();

  const cLogin = async () => {
    let res = await checkLogin();
    if (!res) {
      navigate("../");
    }
  }
  cLogin();

  const { var1, var2 } = useContext(Context);
  const [stopTime, setStopTime] = var1;
  const [workout, setWorkout] = var2;


  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  const stopTimer = () => {
    setStopTime(`${hours}:${minutes}:${seconds}`)
    setWorkout(false)
    navigate("../workouts");
  }


  return (
    <>
      <Logo />
      <div style={{ textAlign: 'center' }}>

        <h1>Timer</h1>
        <div className='timer'>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p>{isRunning ? 'Running' : 'Not running'}</p>


        <button className='btn btn-danger m-5' onClick={pause}>Pause</button>
        <button className='btn btn-danger m-5' onClick={reset}>Reset</button>

        {/* <div><button onClick={stopTimer}>STOP</button></div> */}
        <div className="myBtn"><a onClick={stopTimer}>STOP</a></div>

      </div>
    </>
  );

}





export default Timer;