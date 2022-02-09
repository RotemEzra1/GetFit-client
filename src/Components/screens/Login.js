import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkLogin from "../../checkLogin";
import Alerts from "../assets/Alerts";
import Logo from "../assets/Logo"

const Login = () => {

    let navigate = useNavigate();

    const cLogin = async() => {
        let res = await checkLogin();
        if(res){
            navigate("../home");
        }
    }
    cLogin();
      
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loginError,setLoginError] = useState(false);
    const [registerError,setRegisterError] = useState(false);

    const getToken = async() => {

        try {
            let res = await axios.post("https://getfit-app.herokuapp.com/auth/",{
                email:email,
                password:password
            });
            localStorage.setItem("getfit-token",res.data.token);
            navigate("../home", { replace: true });
        } catch (error) {
            console.log(error);
            setLoginError(true);
        }
       

    }

    const login = async(e) => {

        e.preventDefault();

        getToken();

    }

    const register = async(e) => {
        
        e.preventDefault();

        try {
            let res = await axios.post("https://getfit-app.herokuapp.com/auth/new",{
                email:email,
                password:password
            });  
            
            console.log(res.data);
    
            getToken();
            
        } catch (error) {
            console.log(error);
            setRegisterError(true);
        }
        
    }

    return (
        <div class="accordion mt-5" id="accordionLogin">
            <div className='text-center m-5'>
          <img src='./getfit.png' width="100" height="100"/>
            </div>

            <div class="accordion-item">

                <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    LogIn
                </button>
                </h2>

                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionLogin">
                    <div class="accordion-body">
                        {loginError && <Alerts msg="Email or Password incorrect!" type="danger" />}
                        <form onSubmit={login} >
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" placeholder="name@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label for="emaillogin">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <label for="passwordlogin">Password</label> 
                            </div>
                            <input className="btn btn-danger" type="submit" value="LogIn"/> 
                        </form>
                    </div>
                </div>

            </div>

            <div class="accordion-item">

                <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Register
                </button>
                </h2>

                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionLogin">
                    <div class="accordion-body">
                        {registerError && <Alerts msg="Email already exist!" type="danger"/>}
                        <form onSubmit={register} >
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" placeholder="name@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label for="emaillogin">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <label for="passwordlogin">Password</label> 
                            </div>
                            <input className="btn btn-danger" type="submit" value="Register"/> 
                        </form>
                    </div>
                </div>

            </div>
       
        </div>
    )

}

export default Login;