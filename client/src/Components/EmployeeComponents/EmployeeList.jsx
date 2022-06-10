import React, { useContext, useEffect, useState } from "react";
import { getAllEmployees } from "../../API/employee";
import { ProjectContext } from "../../Context/createContext";
import "../EmployeeComponents/employeelist.css";
import manimg from "../../images/man.png";
import { NavLink } from "react-router-dom";
import AddEmployee from "../EmployeeProfileComponents/AddEmployee/AddEmployee";
import jwtDecode from "jwt-decode";
const EmployeeList = () => {
  const { user, token: contextToken } = useContext(ProjectContext);
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState({
    sortBy: "firstName",
    orderBy: "asc", 
  });
  const {sortBy, orderBy} = query;
  let token = user.token;
  let usertokenDecode = contextToken && jwtDecode(contextToken);
  useEffect(() => {
    if(contextToken){
      getAllEmployees(token? token : contextToken ,{sortBy, orderBy})
        .then((data) => {
          const response = data.data.data;
          console.log(response);
          setEmployees([...response]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [sortBy,orderBy, contextToken]);

  const changeHandlerForFilter = (e)=>{
    setQuery({...query,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>

      <div className="container">
        <div className="row bootstrap snippets bootdeys">
          <div className="col-md-6 col-sm-7">
          </div>
          <div className="d-flex justify-content-between p-2">
            {user?.role?.name === 'superadmin' || usertokenDecode?.role?.name === 'superadmin' && 
            <div className="w-100">
              <AddEmployee />
            </div>
}

            {/* fileter */}
            <div className="d-flex justify-content-end flex-2 w-100">
            <div className="">
              {/* <FilterEmployee/> */}
              <select
                className="form-select w-100"
                aria-label="Default select example"
                name="sortBy"
                id="sortBy"
                value={sortBy}
                onChange={changeHandlerForFilter}
              >
                <option selected disabled>
                  Filter By
                </option>
                <option value={"firstName"}>First Name</option>
                <option value={"lastName"}>Last Name</option>
                <option value={"joiningDate"}>Joining Date</option>
              </select>
            </div>
            <div className="w-20">
              {/* <FilterEmployee/> */}
              <select
                className="form-select w-100"
                aria-label="Default select example"
                name="orderBy"
                id="orderBy"
                value={orderBy}
                onChange={changeHandlerForFilter}
              >
                <option selected disabled>
                  Order By
                </option>
                <option value={"asc"}>ASC</option>
                <option value={"desc"}>DES</option>
              </select>
            </div>
            </div>

            
          </div>
        </div>
            
        {employees.map((employee) => (
          <div key={employee._id} className="member-entry">
            <a href="#" className="member-img">
              <img src={manimg} className="img-rounded" />
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
      </div>
    </div>
  );
};

export default EmployeeList;
