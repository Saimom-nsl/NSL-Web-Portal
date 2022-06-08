import React, { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { newEmployee, nslIdCount } from "../../../API/employee";
import { getAllRoles } from "../../../API/role";
import { ProjectContext } from "../../../Context/createContext";
const boldGroup = ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"];


const AddEmployee = () => {
  const [created, setCreated] = useState(false);
  const [roles, setRoles] = useState([]);
  const {token, user} = useContext(ProjectContext);
  const navigate = useNavigate();
  const body = document.querySelector("body");
  const [emp, setEmp] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    nslId: "",
    nid: "",
    email: "",
    personalPhoneNumber: "",
    officePhoneNumber:"",
    gender: '',
    bloodGroup: "",
    role: "",
    presentAddress: "",
    permanentAddress: "",
    joiningDate: ""
  });
  useEffect(()=>{
    if(token){
      getAllRoles(user.token || token).then(data=> {
        setRoles([...data.data])
      }).catch(err=> console.log(err))
    }
  },[token]);
  useEffect(()=>{
    if(token){
      nslIdCount(token).then(data=> {
        setEmp({...emp, nslId: data.data})
      }).catch(err=> {
        console.log(err);
      })
    }
  },[token])
 

  const {
    firstName, 
    middleName, 
    lastName,
    nslId,
    nid,
    email,
    personalPhoneNumber,
    officePhoneNumber,
    gender,
    bloodGroup,
    role,
    presentAddress,
    permanentAddress,joiningDate
  } = emp;
  function handleCloseModal(){
    document.getElementById("myModal").classList.remove("show", "d-block", "modal-open");  
    document.getElementsByClassName("modal-backdrop")[0].classList.remove("modal-backdrop");
}
  const handleChange = (e)=>{
    setEmp({
      ...emp,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(emp);
    newEmployee(emp, token).then(data=> {
      setCreated(true);
      console.log(data.data);
      // navigate(-1)
      
    }).catch(err=> {
      navigate("/employees")
      console.log(err.data);
      setCreated(false);
      handleCloseModal()
    })

  }
  return (
    <>
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
            <form onSubmit={handleSubmit}>
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
                      value={firstName}
                      onChange={handleChange}
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
                      name="middleName"
                      value={middleName}
                      onChange={handleChange}
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
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
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
                      value={nslId}
                      onChange={handleChange}
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
                      value={nid}
                      onChange={handleChange}
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
                      value={email}
                      onChange={handleChange}
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
                      value={personalPhoneNumber}
                      onChange={handleChange}
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
                      value={officePhoneNumber}
                      onChange={handleChange}
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
                  <input
                      type="date"
                      id="defaultForm-joiningDate"
                      className="form-control validate"
                      name="joiningDate"
                      value={joiningDate}
                      onChange={handleChange}
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="defaultForm-joiningDate"
                    >
                      Joining Date
                    </label>
                    </div>
                    </div>
              <div className="col-md-3">
                  <div className="md-form mb-2">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <select
                      className="form-control"
                      name="role"
                      id="defaultForm-role"
                      value={role}
                      onChange={handleChange}
                      
                    >
                      <option disabled>
                        Role
                      </option>
                      {roles.map(r=> {
                        return <option value={r._id}>{r.name.toUpperCase()}</option>
                      })}
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
                <div className="col-md-3">
                  <div className="md-form mb-2">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <select
                      className="form-control"
                      name="gender"
                      id="defaultForm-gender"
                      value={gender}
                      onChange={handleChange}
                    >
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"others"}>Others</option>
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
                    <select
                      className="form-control"
                      name="bloodGroup"
                      id="defaultForm-bloodGroup"
                      value={bloodGroup}
                      onChange={handleChange}
                    >
                      {/* <option selected disabled>Blood</option> */}

                      {boldGroup.map((bg) => {
                        return (
                          <option key={Math.random()} defaultValue={bg}>
                            {bg}
                          </option>
                        );
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
                
              </div>

              <div className="md-form mb-4">
                {/* <i class="fas fa-lock prefix grey-text"></i> */}
                <input
                  type="text"
                  id="defaultForm-presentAddress"
                  className="form-control validate"
                  name="presentAddress"
                  value={presentAddress}
                  onChange={handleChange}
                />
                <label
                  data-error="wrong"
                  data-success="right"
                  htmlFor="defaultForm-presentAddress"
                >
                  Present Address
                </label>
              </div>
              <div className="md-form mb-4">
                {/* <i class="fas fa-lock prefix grey-text"></i> */}
                <input
                  type="text"
                  id="defaultForm-permanentaddress"
                  className="form-control validate"
                  name="permanentAddress"
                  value={permanentAddress}
                  onChange={handleChange}
                />
                <label
                  data-error="wrong"
                  data-success="right"
                  htmlFor="defaultForm-permanentaddress"
                  value={permanentAddress}
                  onChange={handleChange}
                >
                  Permanent Address
                </label>
              </div>

              {/* {last} */}
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="submit" className="btn btn-default">Create</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
