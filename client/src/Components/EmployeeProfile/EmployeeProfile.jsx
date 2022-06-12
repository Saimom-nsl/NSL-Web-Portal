import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import manimg from "../../images/man.png";
import "../EmployeeProfile/employeeprofile.css";
import { getSingleEmployee } from "../../API/employee";
import { ProjectContext } from "../../Context/createContext";
import OthersInformation from "./RighSideInformation/OthersInformation";
const gender = "male"
const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({});
  const {pid} = useParams();
  const  {token, user} = useContext(ProjectContext);
  useEffect(()=> {
    if(token || user.token){
      
      getSingleEmployee(pid, user.token || token).then(data=> {
        const response = data.data;
        if(response){
          setEmployee(response)
        }
      }).catch(e=> {
        console.log(e);
      })
    }
  },[token])
  return (
    <div className="d-flex justify-content-around p-4">
      <div className="col-md-3 m-1">
        <div
          className="card"
          // style={{ width: "18rem", height: "calc(100vh-7vh)" }}
        >
          <img
            src={manimg}
            style={{ width: "50%", margin: "auto" }}
            className="card-img-top p-2"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title text-center p-2">{employee?.firstName}{" "}{employee?.middleName}{" "}{employee?.lastName}</h5>
            <button className="">Edit</button>
            <div className="d-flex justify-content-between center p-3">
              <p className="card-text">{employee?.email || "N/A"}</p>
              <span>
                <i className="fas fa-at"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p className="card-text">{employee?.personalPhoneNumber}</p>
              <span>
                <i className="fas fa-phone"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p className="card-text">{employee?.skypeId || "N/A"}</p>
              <span>
                <i className="fab fa-skype"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p className="card-text">{employee?.presentAddress || "N/A"}</p>
              <span>
                <i className="fas fa-location"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p className="card-text">{employee?.permanentAddress || "N/A"}</p>
              <span>
                <i className="fas fa-location"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p className="card-text text-capitalize">{employee?.gender || "N/A"}</p>
              <span>
                {employee?.gender === "male" ? (
                  <i className="fas fa-male"></i>
                ) : employee?.gender === "female" ? (
                  <i className="fas fa-female"></i>
                ) : (
                  <i className="fas fa-genderless"></i>
                )}
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p className="card-text">{employee?.bloodGroup || "N/A"}</p>
              <span>
                <i className="fas fa-medkit"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-5 m-1">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title text-center p-2">Projects</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Project Id</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>

                  <td>HQ147</td>
                  <td>DeepICR</td>
                  <td>{new Date("01-01-2020").toLocaleDateString()}</td>
                  <td>90%</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-md-3 m-1">
        <OthersInformation employee={employee} />
      </div>
    </div>
  );
};

export default EmployeeProfile;
