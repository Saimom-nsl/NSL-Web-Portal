import React from "react";
import { Table, Container } from "reactstrap";

const LeaveRequestList = () => {
  return (
    <>
    <h2>Recent Leave Details</h2>
    {/* <Container>Filter By</Container>
    <Container>
        <Input type="select"></Input>
    </Container> */}
      <Table hover size="lg" >
        <thead className="text-center">
          <tr >
            <th>No</th>
            <th>First Name</th>
            <th>Leave Type</th>
            <th>Duration</th>
            <th>Days</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody className="text-center">
            {[1,2,3,4,5].map(d=> (<tr>
            <th scope="row">{d}</th>
            <td>Shuvo</td>
            <td>Emergency</td>
            <td>1</td>
            <td>2022-01-01</td>
            <td className="bg-green"><i className="fas fa-eye"></i></td>
          </tr>))}
          
        </tbody>
      </Table>
    </>
  );
};

export default LeaveRequestList;
