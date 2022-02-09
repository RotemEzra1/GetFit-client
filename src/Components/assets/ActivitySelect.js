import axios from "axios";
import { useState,useEffect } from "react";

const ActivitySelect = ({value,change}) => {

    const [activities,setActivities] = useState([]);
 
    useEffect(async()=>{
        let res = await axios.get("https://getfit-app.herokuapp.com/api/activities/", {
            headers:{
                "x-api-key":localStorage.getItem("getfit-token")
            }
        })
        setActivities(res.data);
    },[]);

    const myOnChange = (e) => {

        change(e.target.value);
   
    }


    return (
        <div class="form-floating mb-3">
            <select class="form-select" value={value} onChange={myOnChange} id="activitySelect" aria-label="Floating label select example">
                <option selected></option>
                {activities.map((activity) => <option value={activity.value}>{activity.name}</option>)}   
            </select>
            <label for="activitySelect">Choose activity:</label>
        </div>
    )

}

export default ActivitySelect;

