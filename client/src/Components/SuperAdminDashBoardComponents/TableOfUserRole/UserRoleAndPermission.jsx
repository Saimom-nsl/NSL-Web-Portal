import React, { useState } from 'react'
import {Table, Modal, ModalBody, ModalFooter, ModalHeader, Button, Form, Input, FormGroup, Label} from "reactstrap";

const UserRoleAndPermission = () => {
    const [toggle, setToggle] = useState(false);
    const handleToggle = ()=> {
        setToggle(!toggle);
    }
  return (
    <>
    <Modal isOpen={toggle} toggle={handleToggle} size='sm'>
        <ModalHeader toggle={handleToggle}>
            Update Roles
        </ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                <Input type='text' name='userId' value={"John"} />
                <Label htmlFor='userId'>Name</Label>

                </FormGroup>
                <FormGroup>
                <Input type='select' name='roles' >
                    <option>member</option>
                    <option>admin</option>
                    <option>superadmin</option>

                </Input>
                <Label htmlFor='roles'>Name</Label>
                </FormGroup>                
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button>Update</Button>
        </ModalFooter>
    </Modal>
    <Table striped>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        User Name
      </th>
      <th>
        User Role
      </th>
      <th>
        Action
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
        1
      </th>
      <td>
        Superadmin
      </td>
      <td>
      Super Admin
      </td>
      <td>
      <i onClick={handleToggle} className="fas fa-cog"></i>
      </td>
    </tr>
    <tr>
      <th scope="row">
        2
      </th>
      <td>
        John
      </td>
      <td>
        Admin
      </td>
      <td >
      <i className="fas fa-cog"></i>
      </td>
    </tr>
    <tr>
      <th scope="row">
        3
      </th>
      <td>
        Doe
      </td>
      <td>
        Manager
      </td>
      <td>
      <i className="fas fa-cog"></i>
      </td>
    </tr>
  </tbody>
</Table>
    </>
  )
}

export default UserRoleAndPermission