import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import Message from '../Alert/Message'
import signup from '../images/signupImage.jpg'
const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",lastName:"", email: "",employmentDate:"" 
    })
    const [message, setMessage] = useState(null)
    let name, value;
    const eventHandle = (e) => {
        name = e.target.name
        value = e.target.value
        // console.log(name, ":", value);
        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
      // console.log(user.date);
      var role = '62394d91cc93e3138cbf616a'
      console.log(role);
        e.preventDefault();
        const { firstName,lastName,email,employmentDate} = user
        const res = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/employee/employeeinvites`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzk1MjFhZDI2ZjExYmI4MjczYjJiYyIsImVtYWlsIjoib25lc29sdXRpb25AZ21haWwuY29tIiwibGFzdExvZ2luVGltZSI6IjIwMjItMDMtMjJUMTA6MjQ6MTguODA4WiIsImlhdCI6MTY0Nzk0NDc3OSwiZXhwIjoxNjQ4MDMxMTc5fQ.bTvnieCHmN2nmgHWeNV8OyqRAtekPep_LlHTjNFbvmo`
            },
            body: JSON.stringify({
              firstName,lastName,email,employmentDate,role
            }),
            credentials: 'include'
        })
        const data = await res.json()
        if (res.status !== 400) {
            console.log(data)
            // setMessage(data.message)
        }
        else {
            setUser({
                name: "",
                email: "",
                password: "",
                cpassword: ""
            })

            console.log(data)
            // setMessage("Registration Successful!!")
            navigate('/login')
        }

    }
    return (
        <div className="mt-5 container">
            {/* {
                message ? <Message message={message} /> : null
            } */}
            <div className="signup-form">
                <div className="signup-content">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="text-center">Employee Create</h1>
                            <form method="POST" >
                                <div className="form-group mt-5">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-user"></span>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" name="firstName"
                                            value={user.firstName} onChange={eventHandle} placeholder="first Name" required="required" />
                                    </div>
                               
                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-lock"></span>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" name="lastName"
                                            value={user.lastName} onChange={eventHandle} placeholder="Last Name" required="required" />
                                    </div>

                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-paper-plane"></span>
                                            </span>
                                        </div>
                                        <input type="email" className="form-control" name="email"
                                            value={user.email} onChange={eventHandle} placeholder="Email Address" required="required" />
                                    </div>
                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-calendar"></span>
                                            </span>
                                        </div>
                                        <input type="date" className='form-control' name="employmentDate" value={user.employmentDate} onChange={eventHandle}/>
                                    </div>
                                    
                                    <div className="form-group for-btn">
                                        <input type="submit" name="signup" className="btn btn-primary btn-lg mt-3" value="Create" onClick={postData} />
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="col-md-6">
                            <div className="another">
                                <img src={signup} alt="signup" className="img-fluid mt-5" />
                                <h5>Already Have An account?</h5>
                                <NavLink to="/login" style={{ color: "#BF252B", fontSize: "1.5rem" }}>Login here</NavLink>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Signup
