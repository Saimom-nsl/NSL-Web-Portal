import React, { useState, useContext } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import jwt_dcode from "jwt-decode";
import { ProjectContext } from '../Context/createContext';
import Message from '../Hooks/Message';

const EmployeeActivation = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null)
    const {setMsg,initialState} = useContext(ProjectContext);
    const [errors, setErrors] = useState({})
    const {url} = useParams();

    //decoded token
    const userDetails = jwt_dcode(url);
    console.log(url);
    //user destructure
    const {email: urlEmail, exp, id} = userDetails;
    
    
    const [user, setUser] = useState({
        email: urlEmail, password: ""
    });


    
    const eventHandle = (e)=> {
        setUser({password: e.target.value});
    }

    const {password} = user;
    const postData = async(e)=> {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/employee/activation/${url}?email=${urlEmail}&id=${id}`, {
            method: "POST",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password
            }),
            credentials: 'include'
        });
        console.log(res);
        const data = await res.json();
        
        if (res.status === 200) {
            //navigate to login
            navigate("/login")
        }
        else {
            // clearMessage()
            
            console.log(data);

        }
    }
  return (
    <div className="mt-5 container">
        <div className="login-form">
                <div className="login-content">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="text-center">Activate Account</h1>
                            <form method="POST">
                                <div className="form-group mt-5">
                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-paper-plane"></span>
                                            </span>
                                        </div>
                                        <input type="email" className="form-control" name="email" value={urlEmail} placeholder="Email Address" readOnly />
                                    </div>


                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-lock"></span>
                                            </span>
                                        </div>
                                        <input type="password" className="form-control" name="password" value={user.password} onChange={eventHandle} placeholder="password" required="required" autoComplete="off"/>
                                        <span>{errors ? errors.password: ""}</span>
                                    </div>

                                    <div className="form-group for-btn">
                                        <button type="submit" onClick={postData}  className="btn btn-primary btn-lg mt-3">Register</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                        
                    </div>
                </div>

            </div>
            

        </div>
  )
}

export default EmployeeActivation