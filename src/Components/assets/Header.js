import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {

    let navigate = useNavigate();

    return (
        <header>
            <nav class="navbar navbar-dark bg-danger">
               <div class="container-fluid">
                    <a class="navbar-brand" href="#">GetFit</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li class="nav-item">
                        <Link className="nav-link" to="/allworkouts">WorkOuts</Link>
                        </li>
                        <li class="nav-item">
                        <Link className="nav-link" to="/progress">Progress</Link>
                        </li>
                        <li class="nav-item">
                        <a className="nav-link" onClick={()=>{
                            localStorage.removeItem("getfit-token");
                            navigate("../");
                        }}>LogOut</a>
                        </li>
                    </ul>
                 
                    </div>
                </div>
            </nav>
        </header>
    )

}

export default Header;