import axios from "axios";
import {useState, useEffect } from "react";
import checkLogin from "../../checkLogin";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import ActivitySelect from "../assets/ActivitySelect";
import Logo from "../assets/Logo"

const Progress = () => {

    let navigate = useNavigate();

    const cLogin = async () => {
        let res = await checkLogin();
        if (!res) {
            navigate("../");
        }
    }
    cLogin();

    const [activity, setActivity] = useState(1)
    const [ data,setData] = useState([["WorkOuts", "Time/min"],[1,1]])

    useEffect(async () => {
        let res = await axios.get(`https://getfit-app.herokuapp.com/api/workouts/type/${activity}`, {
            headers: {
                "x-api-key": localStorage.getItem("getfit-token")
            }
        })
        if(res.data.length>0){
            setData([["WorkOuts", "Time/min"],...res.data]);
        }else{
            setData([["WorkOuts", "Time/min"],[1,1]])
        }
    }, [activity]);

    return (
        <>
            <Logo />
            <h1  className="text-center m-3" >PROGRESS </h1>
            <ActivitySelect value={activity} change={(v) => { setActivity(v); }} />
            <Chart
                chartType="Line"
                data={data}
                width="100%"
                height="400px"
                legendToggle
            />
        </>
    )

}

export default Progress;