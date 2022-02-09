import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Context } from '../../Context';
import ActivitySelect from "../assets/ActivitySelect";
import Input from "../assets/Input";
import checkLogin from "../../checkLogin";
import Logo from "../assets/Logo"

const Workouts = () => {

    let navigate = useNavigate();
    const cLogin = async() => {
        let res = await checkLogin();
        if(!res){
            navigate("../");
        }
    }
    cLogin();

    const { var1, var2 } = useContext(Context);
    const [stopTime, setStopTime] = var1;
    const [workout, setWorkout] = var2;

    const [edit, setEdit] = useState(false)
    const [activity, setActivity] = useState(0)
    const [km, setKm] = useState(0)
    const [date, setDate] = useState(0)
    const [time, setTime] = useState(0)
    const [kcal, setKcal] = useState(0)
    const [note, setNote] = useState("")

    useEffect(() => {
        if (!stopTime && !workout) {
            return;
        }
        if (!workout) {
            setActivity(0);
            setKm(0);
            let now = new Date();
            let timeToPrint = `${now.getFullYear()}-${(now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : `0${(now.getMonth() + 1)}`}-${now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`}`;
            setDate(timeToPrint);
            setTime(stopTime);
            setKcal(0);
            setNote("");
        } else {
            setEdit(true)
            setActivity(workout.activityType);
            setKm(workout.distance);
            setDate(workout.date);
            setTime(workout.time);
            setKcal(workout.Kcal);
            setNote(workout.note);
        }
    }, [])

    const submit = async (e) => {
        e.preventDefault();

        let workoutl = {
            activityType: activity,
            date: date,
            time: time,
            distance: km,
            Kcal: kcal,
            note: note,
        }

        if (edit) {
            console.log(workout._id);
            let updateData = await axios.put("https://getfit-app.herokuapp.com/api/workouts/" + workout._id, workoutl, {
                headers: {
                    "x-api-key": localStorage.getItem("getfit-token")
                }
            })
            console.log(updateData);
        } else {
            let saveData = await axios.post("https://getfit-app.herokuapp.com/api/workouts/", workoutl, {
                headers: {
                    "x-api-key": localStorage.getItem("getfit-token")
                }
            })
            console.log(saveData);
        }

        navigate("../AllWorkouts");

    }

    return (
        <div className="text-center">
            <Logo />
            <h1  className="text-center m-3" >WORKOUT </h1>
            <form onSubmit={submit}>
                <ActivitySelect value={activity} change={(v) => { setActivity(v); }} />
                <Input id="date" type="date" label="Insert Date" myValue={date} change={(v) => { setDate(v); }} />
                <Input id="time" type="text" label="Time" myValue={time} change={(v) => { setTime(v); }} />
                <Input id="km" type="number" label="Km" myValue={km} change={(v) => { setKm(v); }} />
                <Input id="kcal" type="number" label="Calories burned" myValue={kcal} change={(v) => { setKcal(v); }} />
                <Input id="note" type="text" label="Note to remember" myValue={note} change={(v) => { setNote(v); }} />

                <input className="btn btn-danger m-2" type="submit" value="Save Workout" />
            </form>

        </div>
    )

}

export default Workouts;
