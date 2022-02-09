import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import checkLogin from "../../checkLogin";

import { Context } from '../../Context';
import Logo from "../assets/Logo"

const AllWorkouts = () => {

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
    const [workouts, setWorkouts] = useState([]);

    

    const editWorkout = (_workout) => {
        setStopTime(false);
        setWorkout(_workout)
        navigate("../workouts");
    }

    const deleteWorkout = async(_id) => {
        let res = await axios.delete(`https://getfit-app.herokuapp.com/api/workouts/${_id}`, {
            headers: {
                "x-api-key": localStorage.getItem("getfit-token")
            }
        })
        if (res.data.deleted) getData();
        return;
    }

    useEffect(async () => {
        getData();
    }, []);

    const getData = async() => { 
        let res = await axios.get("https://getfit-app.herokuapp.com/api/workouts/", {
            headers: {
                "x-api-key": localStorage.getItem("getfit-token")
            }
        })
        console.log(res.data);
        setWorkouts(res.data);
    }

    return (
        <div>
            <Logo />
            <h1  className="text-center m-3" >ALL WORKOUTS </h1>
            <div class="accordion" id="accordionWorkout">
                {workouts.map((workout) => {
                    return (
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`accordionH${workout._id}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${workout._id}`} aria-expanded="true" aria-controls={`collapse${workout._id}`}>
                                    {workout.activityName} - {workout.date}
                                </button>
                            </h2>
                            <div id={`collapse${workout._id}`} className="accordion-collapse collapse" aria-labelledby={`accordionH${workout._id}`} data-bs-parent="#accordionWorkout">
                                <div class="accordion-body">
                                    <p>
                                        <strong>Time:</strong> {workout.time} <br />
                                        <strong>Km:</strong> {workout.distance} <br />
                                        <strong>Kcal:</strong> {workout.Kcal} <br />
                                        <strong>Note:</strong>  {workout.note} <br />

                                    </p>
                                    <button className="btn btn-danger m-2" onClick={() => { editWorkout(workout) }}>Update</button>
                                    <button className="btn btn-danger" onClick={() => { deleteWorkout(workout._id) }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default AllWorkouts;

