import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
            <nav className="navbar navbar-expand-md navbar-light bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" ><h1 className="color">One<span className="folio">Solution</span></h1></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav ">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/"><span className="font-weight-bolder">Home</span></NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Login"><span className="font-weight-bolder">Login</span></NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Signup"><span className="font-weight-bolder">Signup</span></NavLink>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
  )
}

export default Navbar