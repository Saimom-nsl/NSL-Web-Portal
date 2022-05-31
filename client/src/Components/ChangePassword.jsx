import React from 'react'

const ChangePassword = () => {


  return (
    <div className="mt-5 container">
        <div className="login-form">
                <div className="login-content">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="text-center">Upadate Password</h1>
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
                                        <button type="submit"  className="btn btn-primary btn-lg mt-3">Register</button>
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

export default ChangePassword