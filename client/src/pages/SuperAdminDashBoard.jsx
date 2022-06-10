import React from "react";
import { Card, CardBody, Container, Table, C } from "reactstrap";
import SingleProject from "../Components/Project Components/Single/SingleProject";
import UserRoleAndPermission from "../Components/SuperAdminDashBoardComponents/TableOfUserRole/UserRoleAndPermission";

const SuperAdminDashBoard = () => {
  return (
    <Container className="d-flex justify-content-evenly pt-3">
      <Card>
        <CardBody>
          <UserRoleAndPermission />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
        <SingleProject />
        </CardBody>
        
      </Card>
    </Container>
  );
};

export default SuperAdminDashBoard;
