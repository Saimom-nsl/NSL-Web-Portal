import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,Label, Input, Row, Col  } from "reactstrap";
const EditProfile = ({props}) => {
  const [toggle, setToggole] = useState(false);
  const handleToggle = () => {
    setToggole(!toggle);
  };
  return (
    <div>
      <Button color="danger" onClick={handleToggle}>
        Edit
      </Button>
      <Modal isOpen={toggle} toggle={handleToggle} size="lg">
        <ModalHeader toggle={handleToggle}>Upadate Information</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md="4">
              <FormGroup className="md-form mb-2">
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                // placeholder="with a placeholder"
                type="text"
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
                readOnly
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
              />
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup className="md-form mb-2">
              <Label for="role">Role</Label>
              <Input id="role" name="select" type="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
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
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup className="md-form mb-2">
              <Label for="bloodGroup">Blood Group</Label>
              <Input
                id="bloodGroup"
                name="bloodGroup"
                type="bloodGroup"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
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
              />
            </FormGroup>
            <FormGroup className="md-form mb-2">
              <Label for="permanentAddress">Permanent Address</Label>
              <Input
                id="permanentAddress"
                name="permanentAddress"
                type="text"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="info" className="w-100 p-2" style={{"letterSpacing":"8px", "fontWeight":"bold"}}  size="xl" type="submit" onClick={handleToggle}>
            UPDATE
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProfile;
