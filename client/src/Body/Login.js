import React, { useState, useContext } from 'react'
import { Navigate, NavLink,useNavigate } from 'react-router-dom'
import { loginHandler } from '../API/user'
import { ProjectContext } from '../Context/createContext'
import useAuth from '../Hooks/Auth'
import Message from '../Hooks/Message'
// import useAlert from '../Hooks/Alert'
// import { ProjectContext } from '../Context/createContext'
import login from '../images/login.png'
// import Message from '../Alert/Message'


const Login = () => {
    // const { Login, msg, clearMessage } = useContext(ProjectContext);
    const {setMsg,initialState,userInfo} =useContext(ProjectContext)
    const [message,setMessage] = useState('')
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "", password: ""
    })
    // console.log(initialState);
    const { email, password } = user;

    let name, value;
    const eventHandle = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }
    // const loginUser = async (e) => {
    //     e.preventDefault();
    //     const { email, password } = user;
        // const res = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/v1/users/signin`, {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email, password
        //     }),
        //     credentials: 'include'
        // })
        // const data = await res.json()
        // if (res.status !== 200) {
        //     // clearMessage()
        //     // setMessage(data.message)
        //     console.log(data);
        //     setMessage(data.message)

        // }
        // else {
        //     // clearMessage()
        //     // userInfo(data)
        //     setMsg("login successful");
        //     setMessage(initialState.msg);
        //     console.log(data.data);
            
        //     // Login()
        //     // navigate('/')
        //     if(data.data.isFirstTimeLogin){
        //         navigate("/changepassword")
        //     }

        // }


        //changes by shuvo


        const handleSubmit = (e)=> {
            e.preventDefault();
            // console.log(email, password);
            const logindata = {email, password}
            console.log(logindata);
            loginHandler(logindata).then(data => {
                const response = data.data.data;                
                userInfo(response);
                const slugname = response.email.split("@")[0];
                localStorage.setItem("token", response.token);
                navigate(`/dashboard`)

            }).catch(e=> {
                console.log(e);
            })
        }

        

    return (
        <div className="mt-5 container">
            {
                message ? <Message message={message} /> : null
            }
            <div className="login-form">
                <div className="login-content">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="text-center">Sign In</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-5">
                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-paper-plane"></span>
                                            </span>
                                        </div>
                                        <input type="email" className="form-control" name="email" value={email} onChange={eventHandle} placeholder="Email Address" required="required"  />
                                    </div>


                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-lock"></span>
                                            </span>
                                        </div>
                                        <input type="password" className="form-control" name="password" value={password} onChange={eventHandle} placeholder="password" required="required" autoComplete="off"/>
                                    </div>

                                    <div className="form-group for-btn">
                                    {/* onClick={loginUser} */}
                                        <button type="submit" className="btn btn-primary btn-lg mt-3">Sign In</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="col-md-6">
                            <div className="another">
                                <img src={login} alt="login" className="img-fluid mt-5" style={{ height: "200px", width: "200px" }} />
                                <h5>Not Registered?</h5>
                                <NavLink to="/signup" style={{ color: "#BF252B", fontSize: "1.5rem" }}>Signup here</NavLink>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Login;
