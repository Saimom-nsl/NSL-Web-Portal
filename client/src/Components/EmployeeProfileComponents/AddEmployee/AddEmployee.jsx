import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,Label, Input, Row, Col  } from "reactstrap";

import {useNavigate} from "react-router-dom"
import { newEmployee, nslIdCount } from "../../../API/employee";
import { getAllRoles } from "../../../API/role";
import { ProjectContext } from "../../../Context/createContext";
const boldGroupList = ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"];
const genders = ['male', 'female', 'others'];

const AddEmployee = () => {
  const [created, setCreated] = useState(false);
  const [roles, setRoles] = useState([]);
  const {token, user} = useContext(ProjectContext);
  const [info, setInfo] = useState({
    btnDisabled: true
  })
  const navigate = useNavigate();
  const [toggle, setToggole] = useState(false);

  const handleToggle = () => {
    setToggole(!toggle);
  }; 
   const [emp, setEmp] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    nslId: "",
    nid: "",
    email: "",
    personalPhoneNumber: "",
    officePhoneNumber:"",
    gender: 'male',
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
      newEmployee(emp, user.token || token).then(data=> {
        setToggole(false);

      })
      
    }).catch(err=> {
      setToggole(false);
    })

  }
  return (
    <>
    
    <div className="p-2">
    <Button className="w-50 fw-bold" color="info" onClick={handleToggle}>
        ADD Employee
      </Button>
    </div>
      <Modal isOpen={toggle} toggle={handleToggle} size="">
        <ModalHeader toggle={handleToggle}>Create</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="4">
              <FormGroup className="md-form mb-2">
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                // placeholder="with a placeholder"
                type="text"
                value={firstName}
                onChange={handleChange}
              />
            </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup className="md-form mb-2">
              <Label for="middleName">Middle Name</Label>
              <Input
                id="middleName"
                name="middleName"
                // placeholder="with a placeholder"
                type="text"
                value={middleName}
                onChange={handleChange}
              />
            </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup className="md-form mb-2">
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={handleChange}
              />
            </FormGroup>
              </Col>
            </Row>
          <Row>
            <Col md="6">
            <FormGroup className="md-form mb-2">
              <Label for="nslId">Nsl ID</Label>
              <Input
                id="nslId"
                name="nslId"
                type="text"
                value={nslId}
                onChange={handleChange}
              />
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup className="md-form mb-2">
              <Label for="nid">National ID</Label>
              <Input
                id="nid"
                name="nid"
                type="text"
                value={nid}
                onChange={handleChange}
              />
            </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
            <FormGroup className="md-form mb-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
              />
            </FormGroup>
            </Col>
            <Col md="4">
            <FormGroup className="md-form mb-2">
              <Label for="personalPhoneNumber">Personal Phone Number</Label>
              <Input
                id="personalPhoneNumber"
                name="personalPhoneNumber"
                type="text"
                value={personalPhoneNumber}
                onChange={handleChange}
              />
            </FormGroup>
            </Col>
            <Col md="4">
            <FormGroup className="md-form mb-2">
              <Label for="officePhoneNumber">Office Phone Number</Label>
              <Input
                id="officePhoneNumber"
                name="officePhoneNumber"
                type="text"
                value={officePhoneNumber}
                onChange={handleChange}
              />
            </FormGroup>
            </Col>
          </Row>


            
          <Row>
            <Col md="3">
            <FormGroup className="md-form mb-2">
              <Label for="joiningDate">Joining Date</Label>
              <Input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={joiningDate}
                onChange={handleChange}
              />
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup className="md-form mb-2">
              <Label for="role">Role</Label>
              <Input id="role" name="role" type="select" value={role}
                onChange={handleChange}>
                {roles.map(r => {
                  return <option key={Math.random()}  value={r._id}>{r.name.toUpperCase()}</option>
                })}
              </Input>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup className="md-form mb-2">
              <Label for="gender">Gender</Label>
              <Input
                id="gender"
                name="gender"
                type="select"
                value={gender}
                onChange={handleChange}
              >
                {genders.map(g=> {
                  return <option key={Math.random()}  value={g}>{g.toUpperCase()}</option>
                })}
              </Input>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup className="md-form mb-2">
              <Label for="bloodGroup">Blood Group</Label>
              <Input
                id="bloodGroup"
                name="bloodGroup"
                type="select"
                onChange={handleChange}
                value={bloodGroup}
              >
                {boldGroupList.map(b=> {
                  return <option key={Math.random()} value={b}>{b}</option>
                })}
              </Input>
            </FormGroup>
            </Col>
          </Row>
            <FormGroup className="md-form mb-2">
              <Label for="presentAddress">Present Address</Label>
              <Input
                id="presentAddress"
                name="presentAddress"
                type="text"
                value={presentAddress}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="md-form mb-2">
              <Label for="permanentAddress">Permanent Address</Label>
              <Input
                id="permanentAddress"
                name="permanentAddress"
                type="text"
                value={permanentAddress}
                onChange={handleChange}
              />
            </FormGroup>
          <Button 
          type="submit"
          onClick={handleToggle}
          color="info" 
          className="w-100" 
          style={{"letterSpacing":"8px", "fontWeight":"bold"}}  size="xl">
            ADD
          </Button>{" "}
          </Form>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddEmployee;
