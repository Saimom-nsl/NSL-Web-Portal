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
import { getUserInfo, updateUserInformation } from "../../API/user";
import { ProjectContext } from "../../Context/createContext";
import { userInfoFromToken } from "../../helper/tokenDecoder";

const UpdateUserInformation = ({employeeId}) => {
  const [toggle, setToggole] = useState(false);
  const [roles, setRoles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const { user, token } = useContext(ProjectContext);

  const [userUpdateData, setUserUpdateData] = useState({
    id: userInfo._id,
    email: userInfo?.email,
    password: "",
    confirmPassword: "",
    role: userInfo?.role,
    isActive: userInfo?.isActive,
  });
  const { email, password, confirmPassword, role, isActive , id} = userUpdateData;
  
  useEffect(() => {
    if (token) {
      getAllRoles(user.token || token)
        .then((data) => {
          setRoles([...data.data]);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  //user info fetch
  useEffect(()=> {
    console.log("props", employeeId);
    if(employeeId !== undefined){
      getUserInfo(userInfoFromToken()?.token, employeeId).then(data=> {
        setUserUpdateData({...userUpdateData,
          email:data.data.email, 
          isActive: data.data.isActive, 
          role: data.data.role,
          id: data.data._id
        });
        console.log("use effect", userUpdateData);

      }).catch(err=> {
        // console.log(err);
      })
    }
    getUserInfo()
  },[])

  const handleToggle = () => {
    setToggole(!toggle);
  };

  //input handle change
  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox"? target.checked : target.value
    setUserUpdateData({
        ...userUpdateData,
        [target.name]: value
    })

  };


  //submit user update information
  const handleSubmit = (e)=> {
    e.preventDefault();
    if(password.length){
      if(confirmPassword !== password){
        // console.log(userUpdateData);
        console.log("Password not correct");
        return;
      }
    }
    updateUserInformation(userInfoFromToken().token, 
    {email, password, isActive, role}, id).then(data=> {
      console.log(data);
      setToggole(!toggle);
    }).catch(err=> console.log(err))
  }

  // console.log(userUpdateData);
  return (
    <Container>
      <Button onClick={handleToggle}>Update User Information</Button>
      <Modal toggle={handleToggle} isOpen={toggle}>
        <ModalBody>
          <form onSubmit={handleSubmit}>
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
              {/* <option >{role.name.toUpperCase()}</option> */}
                
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
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={handleSubmit}>Update User Info</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default UpdateUserInformation;
