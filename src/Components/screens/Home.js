import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import checkLogin from "../../checkLogin";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/Logo"


const Home = () => {

    let navigate = useNavigate();

    const cLogin = async () => {
        let res = await checkLogin();
        if (!res) {
            navigate("../");
        }
    }
    cLogin();

    const [quote, setQuote] = useState("");
    const [from, setFrom] = useState("");

    useEffect(async () => {
        const options = {
            method: 'GET',
            url: 'https://random-quotes7.p.rapidapi.com/getRandomQuote',
            headers: {
                'x-rapidapi-host': 'random-quotes7.p.rapidapi.com',
                'x-rapidapi-key': '8787beb7a5mshade7c25709ad3d0p1d9861jsnc530d3d58198'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response);
            setQuote(response.data.text);
            setFrom(response.data.from);
        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    return (
        <>
            <Logo />
            <h1 className="text-center m-5" >Lets Start to WorkOut!</h1>
            {/* <p>{quote}</p>
            <p>{from}</p> */}
            <div className="myBtn"><Link to="/timer">START</Link></div>
          
            <h3 className="text-center m-3"><i>“Run when you can, walk if you have to, crawl if you must. just never give up.”</i></h3>
            <h5><i>– Dean Karnazes</i></h5>

        </>
    )

}

export default Home;