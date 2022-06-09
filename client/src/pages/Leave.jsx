import React from "react";
import { Button } from "reactstrap";
import LeaveRequestForm from "../Components/LeaveRequestComponents/Request Form/LeaveRequestForm";
import LeaveRequestList from "../Components/LeaveRequestComponents/RequestList/LeaveRequestList";

const Leave = () => {
  return (
    <div className="container">
    
    <LeaveRequestForm />
      <div className="">
        <div className="shadow-lg p-3 mb-5 bg-body rounded w-100">
          <LeaveRequestList />
        </div>
        {/* <div className='shadow-lg p-3 mb-5 bg-body rounded' style={{"flexBasis": "500px"}}>
        <LeaveRequestForm />
        </div> */}
      </div>
    </div>
  );
};

export default Leave;
