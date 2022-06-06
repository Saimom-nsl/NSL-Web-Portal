import React, {useContext, useEffect, useState} from 'react';
import { getAllEmployees } from '../../API/employee';
import { ProjectContext } from '../../Context/createContext';
import "../EmployeeComponents/employeelist.css"
import manimg from "../../images/man.png"

const EmployeeList = () => {
    const {user, token: contextToken} = useContext(ProjectContext);
    const [employees, setEmployees] = useState([])
    let token = user.token;
    useEffect(()=> {
        getAllEmployees(token).then(data =>{
            const response = data.data.data;
            setEmployees([...response])
        }).catch(err=> {
            console.log(err);
        })
    },[])
    console.log(contextToken);
  return (
    <div>
<div className="container">
<div className="row bootstrap snippets bootdeys"> 
    <div className="col-md-9 col-sm-7"> 
        <h2>Members</h2> 
    </div> 
    {/* <div className="col-md-3 col-sm-5"> 
        <form method="get" role="form" className="search-form-full"> 
            <div className="form-group"> 
                <input type="text" className="form-control" name="s" id="search-input" placeholder="Search..." /> 
                <i className="entypo-search"></i> 
            </div> 
        </form> 
    </div>  */}
</div>
    {employees.map(employee => <div key={employee._id} className="member-entry"> 
    <a href="#" className="member-img"> 
        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="img-rounded" /> 
        <i className="fa fa-forward"></i> 
    </a> 

    <div className="member-details"> 
        <h4> <a href="#">{employee?.firstName} {employee.middleName?.middleName} {employee?.lastName}</a> </h4> 
        <div className="row info-list"> 
            {/* <div className="col-sm-4"> 
                <i className="fa fa-briefcase"></i>
                Co-Founder at <a href="#">Complete Tech</a> 
            </div>  */}
            <div className="col-sm-4"> 
            <i class="fas fa-calendar-check"></i>
                <a href="#">{employee.joiningDate && new Date(employee.joiningDate).toLocaleDateString("eu")}</a> 
            </div> 
            <div className="col-sm-4"> 
            <i className="fab fa-facebook"></i>
                <a href="#">@facebook</a> 
            </div> 
            <div className="clear"></div> 
            <div className="col-sm-4"> 
            <i className="fas fa-location"></i>
                <a href="#">@loacation</a> 
            </div> 
            <div className="col-sm-4"> 
                <i className="fa fa-envelope"></i> 
                <a href="#">@email</a> 
            </div> 
            <div className="col-sm-4"> 
            <i className="fab fa-linkedin"></i>
                <a href="#">@linkdln</a> 
            </div> 
        </div> 
    </div> 
</div>)}
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
  )
}

export default EmployeeList