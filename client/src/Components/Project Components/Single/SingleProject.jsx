import React from "react";
import { NavLink } from "react-router-dom";

const SingleProject = () => {
  return (
    <>
      <div className="singleProject" style={{"flexBasis": "250px"}}>
        <div className="card p-3 mb-2">
          <div className="d-flex justify-content-start">
            <div className="d-flex flex-row align-items-center">
              <div className="icon">
                {" "}
                <i className="bx bxl-mailchimp"></i>{" "}
              </div>
              <div className="ms-2 c-details">
                <h6 className="mb-0">Project Code</h6>{" "}
                <span style={{ fontSize: "0.8rem" }} className="text-muted">
                  From 2020/01/01
                </span>
              </div>
            </div>

          </div>
          <div className="p-2 d-flex">
            {/* <div>
              <i style={{"fontSize": "2.5rem"}} class="far fa-project-diagram"></i>
            </div> */}
            <div style={{"lineHeight": "1.2"}}>
              <pre><i class="far fa-chess-king-alt"></i>Safi Ahmed</pre>
              <pre> <i class="far fa-chess-queen"></i>Kazal</pre>
            </div>
          </div>
          <div className="mt-5">
            <NavLink to={`/projects/pid`} className="text-muted">
              <h4 className="heading">
                Lorem
                <br />
                Lorem ipsum
              </h4>
            </NavLink>

            <div className="mt-5">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: "50%" }}
                  //   aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              {/* <div className="mt-3"> <span className="text1">32 Applied <span className="text2">of 50 capacity</span></span> </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
