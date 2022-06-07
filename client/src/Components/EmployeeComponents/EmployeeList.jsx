import React, { useContext, useEffect, useState } from "react";
import { getAllEmployees } from "../../API/employee";
import { ProjectContext } from "../../Context/createContext";
import "../EmployeeComponents/employeelist.css";
import manimg from "../../images/man.png";
import { NavLink } from "react-router-dom";
const boldGroup = ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]
const EmployeeList = () => {
  const { user, token: contextToken } = useContext(ProjectContext);
  const [employees, setEmployees] = useState([]);
  let token = user.token;
  useEffect(() => {
    getAllEmployees(token)
      .then((data) => {
        const response = data.data.data;
        setEmployees([...response]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row bootstrap snippets bootdeys">
          <div className="col-md-6 col-sm-7">
            <h2>Employees</h2>
          </div>
          {/* <div className="col-md-6 col-sm-7">
            <button
              className="btn btn-info btn-rounded mt-1"
              data-toggle="modal"
              data-target="#modalLoginForm"
            >ADD Employee</button>
          </div> */}

          {/* modal */}
          <div
            className="modal fade"
            id="modalLoginForm"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">
                    Create Employee
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="md-form mb-2">
                        {/* <i class="fa-solid fa-envelope"></i> */}
                        <input
                          type="text"
                          id="defaultForm-firstName"
                          className="form-control validate"
                          name="firstName"
                        />
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-firstName"
                        >
                          First Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <input
                          type="text"
                          id="defaultForm-middleName"
                          className="form-control validate"
                        />
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-middleName"
                        >
                          Middle Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <input
                          type="text"
                          id="defaultForm-lastName"
                          className="form-control validate"
                        />
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-lastName"
                        >
                          Last Name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <input
                          type="text"
                          id="defaultForm-nslId"
                          className="form-control validate"
                          name="nslId"
                        />
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-nslId"
                        >
                          NSL ID
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <input
                          type="text"
                          id="defaultForm-nid"
                          className="form-control validate"
                          name="nid"
                        />
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-nid"
                        >
                          National ID
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <input
                          type="email"
                          id="defaultForm-email"
                          className="form-control validate"
                          name="email"
                        />
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-email"
                        >
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <input
                          type="text"
                          id="defaultForm-personalPhoneNumber"
                          className="form-control validate"
                          name="personalPhoneNumber"
                        />
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-personalPhoneNumber"
                        >
                          Personal Phone Number
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <input
                          type="text"
                          id="defaultForm-officePhoneNumber"
                          className="form-control validate"
                          name="officePhoneNumber"
                        />
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-officePhoneNumber"
                        >
                          Office Phone Number
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <select className="form-control" name="gender" id="defaultForm-gender">
                          <option defaultValue={'male'}>Male</option>
                          <option defaultValue={'female'}>Female</option>
                          <option defaultValue={'others'}>Others</option>


                        </select>
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-gender"
                        >
                          Gender
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                    <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <select className="form-control" name="bloodGroup" id="defaultForm-bloodGroup">
                         {/* <option selected disabled>Blood</option> */}

                        {boldGroup.map(bg=> {
                            return <option key={Math.random()} defaultValue={bg}>{bg}</option>
                        })}  


                        </select>
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-bloodGroup"
                        >
                          Blood Group
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                    <div className="md-form mb-2">
                        {/* <i className="fas fa-lock prefix grey-text"></i> */}
                        <select className="form-control" name="gender" id="defaultForm-gender">
                          <option selected disabled>Role</option>
                          <option defaultValue={'admin'}>Male</option>
                          <option defaultValue={'teamLead'}>Leam Lead</option>
                          {/* <option defaultValue={'superVisor'}>Supervirsor</option> */}
                          <option defaultValue={'user'}>Users</option>


                        </select>
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="defaultForm-role"
                        >
                          Role
                        </label>
                      </div>
                    </div>
                  </div>
                  

        <div className="md-form mb-4">
          {/* <i class="fas fa-lock prefix grey-text"></i> */}
          <input type="text" id="defaultForm-presentAddress" className="form-control validate" />
          <label data-error="wrong" data-success="right" htmlFor="defaultForm-presentAddress">Present Address</label>
        </div>
        <div className="md-form mb-4">
          {/* <i class="fas fa-lock prefix grey-text"></i> */}
          <input type="text" id="defaultForm-permanent" className="form-control validate" />
          <label data-error="wrong" data-success="right" htmlFor="defaultForm-permanent">Permanent Address</label>
        </div>

                  {/* {last} */}
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-default">Create</button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="text-center">
            <a
              href=""
              className="btn btn-default btn-rounded mb-4"
              data-toggle="modal"
              data-target="#modalLoginForm"
            >
              Add Employee
            </a>
          </div> */}
          {/* <div className="col-md-3 col-sm-5"> 
        <form method="get" role="form" className="search-form-full"> 
            <div className="form-group"> 
                <input type="text" className="form-control" name="s" id="search-input" placeholder="Search..." /> 
                <i className="entypo-search"></i> 
            </div> 
        </form> 
    </div>  */}
        </div>
        <div className="">
        <button className="member-details btn btn-lg btn-info " data-toggle="modal"
              data-target="#modalLoginForm">Add Employee
              </button>
        </div>
        {employees.map((employee) => (
          <div key={employee._id} className="member-entry">
            <a href="#" className="member-img">
              <img
                src={manimg}
                className="img-rounded"
              />
              <i className="fa fa-forward"></i>
            </a>

            <div className="member-details">
              <h4>
                {" "}
                <NavLink to={`/employees/${employee.nslId}`}>
                  {employee?.firstName} {employee?.middleName}{" "}
                  {employee?.lastName}
                </NavLink>{" "}
              </h4>
              <div className="row info-list">
                {/* <div className="col-sm-4"> 
                <i className="fa fa-briefcase"></i>
                Co-Founder at <a href="#">Complete Tech</a> 
            </div>  */}
                {/* <div className="col-sm-4">
                  <i className="fas fa-calendar-check"></i>
                  <a href="#">
                    {employee.joiningDate &&
                      new Date(employee.joiningDate).toLocaleDateString("eu")}
                  </a>
                </div> */}
                <div className="clear"></div>
                <div className="col-sm-4">
                  <i className="fas fa-location"></i>
                  <a href="#">{employee?.presentAddress || "N/A"}</a>
                </div>
                <div className="col-sm-4">
                  <i className="fa fa-envelope"></i>
                  <a href="#">{employee?.email || "N/A"}</a>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="member-entry"> 
    <a href="#" className="member-img"> 
        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="img-rounded" /> 
        <i className="fa fa-forward"></i> 
    </a> 

    <div className="member-details"> 
        <h4> <a href="#">Johnnie Linton</a> </h4> 
        <div className="row info-list"> 
            <div className="col-sm-4"> 
                <i className="fa fa-briefcase"></i>
                Co-Founder at <a href="#">Complete Tech</a> 
            </div> 
            <div className="col-sm-4"> 
                <i className="fa fa-twitter"></i> 
                <a href="#">@johnnie</a> 
            </div> 
            <div className="col-sm-4"> 
                <i className="fa fa-facebook"></i> 
                <a href="#">fb.me/johnnie</a> 
            </div> 
            <div className="clear"></div> 
            <div className="col-sm-4"> 
                <i className="fa fa-location"></i> 
                <a href="#">Prishtina</a> 
            </div> 
            <div className="col-sm-4"> 
                <i className="fa fa-envelope"></i> 
                <a href="#">john@gmail.com</a> 
            </div> 
            <div className="col-sm-4"> 
                <i className="fa fa-linkedin"></i> 
                <a href="#">johnkennedy</a> 
            </div> 
        </div> 
    </div> 
</div> */}
      </div>
    </div>
  );
};

export default EmployeeList;
