import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Button,
} from "reactstrap";
import { getAllEmployees } from "../../../API/employee";
import { ProjectContext } from "../../../Context/createContext";
const categories = ["marriage", "events", "death"]; 
const LeaveRequestForm = () => {
  const [toggle, setToggole] = useState(false);
  const [emp, setEmp] = useState([])
  const {token, user} = useContext(ProjectContext);
  const [leaveRequest, setLeaveRequest] = useState({
      empId:"",
      leaveType: "",
      leaveCategory: "",
      leaveReason:"",
      startDate: "",
      endDate: "",
      amount: "",
      duration: ""
  })
  const {duration, empId, leaveType, startDate, endDate, leaveCategory} = leaveRequest;
  useEffect(()=> {
    if(token || user.token){

      getAllEmployees(user.token|| token).then(data=> {
        const response = data.data.data;
          setEmp([...response]);
      }).catch(err=> {
        console.log(err);
      })
    }
  },[token])
  const handleChange = (e)=> {
      setLeaveRequest({
          ...leaveRequest,
          [e.target.name]: e.target.value
      })
  }

  const handleToggle = () => {
    setToggole(!toggle);
  };
  console.log(leaveRequest);
  return (
    <>
      <div className="p-2">
        <Button className="p-2" onClick={handleToggle}>Create Leave For Employee</Button>
      </div>

      <Modal isOpen={toggle} toggle={handleToggle} size="">
        <ModalHeader toggle={handleToggle}>Leave Form</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="md-form mb-2">
              <Label for="empid">First Name</Label>
              <Input
                id="empId"
                name="empId"
                // placeholder="with a placeholder"
                type="select"
                value={empId}
                onChange={handleChange}
              >
                {emp.map(em=> {
                  return <option value={em?._id}>{em?.firstName}{" "}{em?.lastName}</option>
                })}
              </Input>
            </FormGroup>
            <FormGroup className="md-form mb-2">
              <Label for="duration">Day Range</Label>
              <Input
                id="duration"
                name="duration"
                type="select"
                value={duration}
                onChange={handleChange}

              >
              <option value="halfDay">Half Day</option>
              <option value="fullDay">One Day</option>
              <option value="range">Range</option>
              </Input>
            </FormGroup>
            <FormGroup className="md-form mb-2">
              <Label for="leaveType">Leave Type</Label>
              <Input
                id="leaveType"
                name="leaveType"
                type="select"
                value={leaveType}
                onChange={handleChange}
              >
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Medical</option>
              </Input>
            </FormGroup>
            <FormGroup className="md-form mb-2">
              <Label for="leaveType">Leave Category</Label>
              <Input
                name="leaveCategory"
                type="text"
                list="categories"
                value={leaveCategory}
                onChange={handleChange}
              />
                <datalist id="categories">
              {categories.map(cat=> {
                return <option value={cat}>{cat}</option>
              })}
              </datalist>
            </FormGroup>
            
            <FormGroup className="md-form mb-2">
              <Label for="leaveReason">Reason</Label>
              <Input
                id="leaveReason"
                name="leaveReason"
                // placeholder="with a placeholder"
                type="textarea"
                value={startDate}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="md-form mb-2">
              <Label for="startDate">{duration === "range"? 'Start Date': 'Date'}</Label>
              <Input
                id="startDate"
                name="startDate"
                // placeholder="with a placeholder"
                type="date"
                value={startDate}
                onChange={handleChange}
              />
            </FormGroup>
            {duration === "range" && <><FormGroup className="md-form mb-2">
              <Label for="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                // placeholder="with a placeholder"
                type="date"
                value={endDate}
                onChange={handleChange}
              />
            </FormGroup></>}

            <Button
              type="submit"
              onClick={handleToggle}
              color="info"
              className="w-100"
              style={{ letterSpacing: "5px", fontWeight: "bold" }}
              size="xl"
            >
              SUBMIT
            </Button>{" "}
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default LeaveRequestForm;
