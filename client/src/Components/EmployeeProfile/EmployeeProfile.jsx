import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import manimg from "../../images/man.png";
import "../EmployeeProfile/employeeprofile.css";
import {} from "react-router-dom";
import { getSingleEmployee } from "../../API/employee";
import { ProjectContext } from "../../Context/createContext";
const gender = "male"
const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({});
  const {pid} = useParams();
  const  {token} = useContext(ProjectContext);
  useEffect(()=> {
    if(token){

      getSingleEmployee(pid, token).then(data=> {
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
            className="pt-2"
            style={{ width: "50%", margin: "auto" }}
            class="card-img-top p-2"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title text-center p-2">{employee?.firstName}{" "}{employee?.middleName}{" "}{employee?.lastName}</h5>
            <div className="d-flex justify-content-between center p-3">
              <p class="card-text">{employee?.email || "N/A"}</p>
              <span>
                <i class="fas fa-at"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p class="card-text">{employee?.personalPhoneNumber}</p>
              <span>
                <i class="fas fa-phone"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p class="card-text">{employee?.skypeId || "N/A"}</p>
              <span>
                <i class="fab fa-skype"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p class="card-text">{employee?.presentAddress || "N/A"}</p>
              <span>
                <i class="fas fa-location"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p class="card-text">{employee?.permanentAddress || "N/A"}</p>
              <span>
                <i class="fas fa-location"></i>
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p class="card-text text-capitalize">{employee?.gender || "N/A"}</p>
              <span>
                {employee?.gender === "male" ? (
                  <i class="fas fa-male"></i>
                ) : employee?.gender === "female" ? (
                  <i class="fas fa-female"></i>
                ) : (
                  <i class="fas fa-genderless"></i>
                )}
              </span>
            </div>
            <div className="d-flex justify-content-between p-3">
              <p class="card-text">{employee?.bloodGroup || "N/A"}</p>
              <span>
                <i class="fas fa-medkit"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 m-1">
        <div className="card h-100">
          <div class="card-body">
            <h5 class="card-title text-center p-2">Projects</h5>
            <table class="table table-striped">
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
        <div
          className="card h-100"
          // style={{ width: "18rem", height: "calc(100vh-7vh)" }}
        >
          <div class="card-body">
            <h5 class="card-title text-center p-2">Skills</h5>
            <div className="d-flex justify-content-between center p-3">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Skill</th>
                    <th scope="col">Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Node JS</td>
                    <td>Beagainer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
