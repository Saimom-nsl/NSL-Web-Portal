import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../Context/createContext';
import useAuth from '../Hooks/Auth';

const Navbar = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const {userInfo, userlogout} = useContext(ProjectContext);
    const logout = ()=> {
        const token = localStorage.getItem("token");
        if(token) {
            localStorage.removeItem("token");
            userlogout();
            navigate("/login");
        };
    }
  return (
    <div>
            <nav className="navbar navbar-expand-md navbar-light bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" ><h1 className="color">NSL<span className="folio">Board</span></h1></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav ">
                        {!auth? (<>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/Login"><span className="font-weight-bolder">Login</span></NavLink>
                            </li>
                        </>): (
                            <>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/"><span className="font-weight-bolder">Home</span></NavLink>
                            </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/dashboard`}><span className="font-weight-bolder">Dashboard</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <p className="nav-link" onClick={logout} style={{"cursor": "pointer"}}><span className="font-weight-bolder">Logout</span></p>
                        </li>
                            </>
                        )}
                        
                    </ul>
                </div>
                </div>
            </nav>
        </div>
  )
}

export default Navbar