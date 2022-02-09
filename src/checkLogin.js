import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const checkLogin = async() => {

    if(localStorage.getItem("getfit-token")){
        try {
            let res = await axios.get("https://getfit-app.herokuapp.com/auth/", {
                headers: {
                    "x-api-key": localStorage.getItem("getfit-token")
                }
            });
            if(res.data.login == true){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            return false;
        }      
    }else{
        return false;
    }
}

export default checkLogin;