import React, { useState } from "react";
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
const LeaveRequestForm = () => {
  const [toggle, setToggole] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState({
      empId:"",
      leaveType: "",
      startDate: "",
      endDate: "",
      amount: "",
      duration: ""
  })
  const {duration, empId, leaveType, startDate, endDate} = leaveRequest;
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
                type="text"
                value={empId}
                onChange={handleChange}
              />
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
