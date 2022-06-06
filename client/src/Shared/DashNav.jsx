import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Shared/dashnav.css";
import manimg from "../images/man.png";
import useAuth from "../Hooks/Auth";
import { ProjectContext } from "../Context/createContext";
import jwtDecode from "jwt-decode";

const DashNav = () => {
  const [toggle, setToggle] = useState(false);
  // const [user, setUser] = useState({});
  const body = document.querySelector("body");
  const auth = useAuth();
  const navigate = useNavigate();

  const { userInfo, userlogout,user, token } = useContext(ProjectContext);
  console.log(token);
  // const user = jwtDecode(token);
  // useEffect(()=> {
  //   setUser(userfromtoken)
  // },[userfromtoken])
  const logout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      userlogout();
      navigate("/");
    }
  };
  const handleToggle = () => {
    body.classList.toggle("active");
    setToggle(!toggle);
  };
  return (
    <div className="wrapper">
      <div className="section" style={
        (toggle || auth)? {"width": "calc(100% - 225px)", "marginLeft": "225px"}:
        {"width": "100%", "marginLeft": "0"}
      }>
        <div className="top_navbar">
          {auth && (
              <div className="hamburger" onClick={handleToggle}>
                <span >
                  <i className="fas fa-bars"></i>
                </span>
              </div>
          )}
          <NavLink className="navbar-brand" to="#">
            <h1 className="color">
              Next Solution<span className="folio">Lab</span>
            </h1>
          </NavLink>
        </div>
      </div>
      {auth && (
        <div className="sidebar">
          <div className="profile">
            <img src={manimg} alt="profile_picture" />
            <h3>{user?.email}</h3>
            <p>{user?.role?.name}</p>
          </div>
          <ul>
            <li>
              <NavLink to="/dashboard">
                <span className="icon">
                  <i className="fas fa-desktop"></i>
                </span>
                <span className="item">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/leave">
                <span className="icon">
                  <i className="fas fa-suitcase"></i>
                </span>
                <span className="item">Leave</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/employees">
                <span className="icon">
                  <i className="fas fa-users"></i>
                </span>
                <span className="item">Employees</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects">
                <span className="icon">
                  <i className="fas fa-project-diagram"></i>
                </span>
                <span className="item">Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={logout}>
                <span className="icon">
                  <i className="fas fa-sign-out"></i>
                </span>
                <span className="item">LogOut</span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashNav;
