import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { BreadcrumbItem, Breadcrumb } from "reactstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container,
  FormFeedback,
} from "reactstrap";
import { newEmployee, nslIdCount } from "../../../API/employee";
import { getAllRoles } from "../../../API/role";
import { ProjectContext } from "../../../Context/createContext";
const boldGroupList = ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"];
const genders = ["male", "female", "others"];

const employeeCreationSchema = Yup.object({
  firstName: Yup.string().min(2, "Too Short").required("Required"),
  lastName: Yup.string().min(2, "Too Short").required("Required"),
  nslId: Yup.string().min(4, "Too Short").required("Required"),
  nid: Yup.string().min(10, "Too Short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  personalPhoneNumber: Yup.string().min(10, "Too Short").required("Required"),
  officePhoneNumber: Yup.string().min(11, "Too Short").required("Required"),
  gender: Yup.string().required("Required"),
  bloodGroup: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  presentAddress: Yup.string().required("Required"),
  permanentAddress: Yup.string().required("Required"),
  joiningDate: Yup.date().required("Required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  nslId: "",
  nid: "",
  email: "",
  personalPhoneNumber: "",
  officePhoneNumber: "",
  gender: "male",
  bloodGroup: "",
  role: "",
  presentAddress: "",
  permanentAddress: "",
  joiningDate: "",
};
const AddEmp = () => {
  const [roles, setRoles] = useState([]);
  const { token, user } = useContext(ProjectContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      getAllRoles(user.token || token)
        .then((data) => {
          setRoles([...data.data]);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);
  //   useEffect(()=>{
  //     if(token){
  //       nslIdCount(user.token || token).then(data=> {
  //         // formik.setValues({nslId: data.data})
  //       }).catch(err=> {
  //         console.log(err);
  //       })
  //     }
  //   },[token])
  const submitHandler = (values) => {
    console.log(values);
    newEmployee(values, user.token || token).then(data => {
      console.log(data.data);
      navigate("/employees")
    }).catch(err=> console.log(err))

  };
  return (
    <>
    <div>
    <Breadcrumb>
    <BreadcrumbItem>
      <NavLink to="/employees">
        Employee
      </NavLink>
    </BreadcrumbItem>
    <BreadcrumbItem active>
      Add Employee
    </BreadcrumbItem>
  </Breadcrumb>
    </div>
    <Container>
 
      <Formik
        initialValues={initialValues}
        validationSchema={employeeCreationSchema}
        onSubmit={ submitHandler }
      >

        <Form>
          <Row>
            <Col md="4">
              <FormGroup className="md-form mb-2">
                <Label for="firstName">First Name</Label>
                <Field
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  // placeholder="with a placeholder"
                  type="text"
                />
                <ErrorMessage name="firstName" component={"span"} />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup className="md-form mb-2">
                <Label for="middleName">Middle Name</Label>
                <Field
                  id="middleName"
                  name="middleName"
                  // placeholder="with a placeholder"
                  type="text"
                  className="form-control"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup className="md-form mb-2">
                <Label for="lastName">Last Name</Label>
                <Field id="lastName" name="lastName" type="text" className="form-control" />
                <ErrorMessage name="lastName" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup className="md-form mb-2">
                <Label for="nslId">Nsl ID</Label>
                <Field id="nslId" name="nslId" type="text" className="form-control" />
                <ErrorMessage name="nslId" />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="md-form mb-2">
                <Label for="nid">National ID</Label>
                <Field id="nid" name="nid" type="text" className="form-control" />
                <ErrorMessage name="nid" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup className="md-form mb-2">
                <Label for="email">Email</Label>
                <Field id="email" name="email" type="email" className="form-control" />
                <ErrorMessage name="email" />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup className="md-form mb-2">
                <Label for="personalPhoneNumber">Personal Phone Number</Label>
                <Field
                  id="personalPhoneNumber"
                  name="personalPhoneNumber"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage name="personalPhoneNumber" />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup className="md-form mb-2">
                <Label for="officePhoneNumber">Office Phone Number</Label>
                <Field
                  id="officePhoneNumber"
                  name="officePhoneNumber"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage name="officePhoneNumber" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup className="md-form mb-2">
                <Label for="joiningDate">Joining Date</Label>
                <Field id="joiningDate" name="joiningDate" type="date" className="form-control" />
                <ErrorMessage name="joiningDate" />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup className="md-form mb-2">
                <Label for="role">Role</Label>
                <Field id="role" name="role" as="select" className="form-control">
                  {roles.map((r) => {
                    return (
                      <option key={Math.random()} value={r._id}>
                        {r.name.toUpperCase()}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="role" />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup className="md-form mb-2">
                <Label for="gender">Gender</Label>
                <Field id="gender" name="gender" as="select" className="form-control">
                  {genders.map((g) => {
                    return (
                      <option key={Math.random()} value={g}>
                        {g.toUpperCase()}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="gender" />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup className="md-form mb-2">
                <Label for="bloodGroup">Blood Group</Label>
                <Field id="bloodGroup" name="bloodGroup"   as="select" className="form-control">
                  {boldGroupList.map((b) => {
                    return (
                      <option key={Math.random()} value={b}>
                        {b}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="bloodGroup" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="md-form mb-2">
            <Label for="presentAddress">Present Address</Label>
            <Field id="presentAddress" name="presentAddress" type="text" className="form-control" />
            <ErrorMessage name="presentAddress" />
          </FormGroup>
          <FormGroup className="md-form mb-2">
            <Label for="permanentAddress">Permanent Address</Label>
            <Field id="permanentAddress" name="permanentAddress" type="text" className="form-control" />
            <ErrorMessage name="permanentAddress" />
          </FormGroup>
          <Button
            type="submit"
            color="info"
            className="w-100"
            style={{ letterSpacing: "8px", fontWeight: "bold" }}
            size="xl"
          >
            ADD
          </Button>{" "}
        </Form>
      </Formik>
    </Container>
    </>
  );
};

export default AddEmp;
