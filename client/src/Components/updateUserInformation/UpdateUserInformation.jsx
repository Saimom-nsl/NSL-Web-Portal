import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  Container,
  Button,
  Label,
} from "reactstrap";
import { getAllRoles } from "../../API/role";
import { ProjectContext } from "../../Context/createContext";
import { userInfoFromToken } from "../../helper/tokenDecoder";

const UpdateUserInformation = ({user: empUser}) => {
  const [toggle, setToggole] = useState(false);
  const [roles, setRoles] = useState([]);
  const { user, token } = useContext(ProjectContext);
  
  useEffect(() => {
    if (token) {
      getAllRoles(user.token || token)
        .then((data) => {
          setRoles([...data.data]);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);
  const handleToggle = () => {
    setToggole(!toggle);
  };

  const [userUpdateData, setUserUpdateData] = useState({
    email: empUser.email || "",
    password: "",
    confirmPassword: "",
    role: "",
    isActive: empUser.isActive,
  });
  const { email, password, confirmPassword, role, isActive } = userUpdateData;

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox"? target.checked : target.value
    setUserUpdateData({
        ...userUpdateData,
        [target.name]: value
    })

  };

  console.log(userUpdateData);
  return (
    <Container>
      <Button onClick={handleToggle}>Update User Information</Button>
      <Modal toggle={handleToggle} isOpen={toggle}>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input name="email" type="email" 
              value={email}
              onChange={handleInputChange} />
              <Label htmlFor="email">Email</Label>
            </FormGroup>
            <FormGroup>
              <Input
                name="password"
                type="password"
                placeholder="*********"
                value={password}
                onChange={handleInputChange}
              />
              <Label htmlFor="password">Password</Label>
            </FormGroup>
            <FormGroup>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="*********"
                value={confirmPassword}
                onChange={handleInputChange}
              />
              <Label htmlFor="confirmPassword">Confirm Password</Label>
            </FormGroup>
            <Input
              type="select"
              name="role"
              value={role}
              onChange={handleInputChange}
            >
                
              {roles.map((role) => (
                <option key={Math.random()} value={role._id}>
                  {role.name.toUpperCase()}
                </option>
              ))}
            </Input>
            <FormGroup>
              <Input
                type="checkbox"
                name="isActive"
                checked={isActive}
                onChange={handleInputChange}
              />
              <Label htmlFor="isActive">Active User</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button>Update User Info</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default UpdateUserInformation;
