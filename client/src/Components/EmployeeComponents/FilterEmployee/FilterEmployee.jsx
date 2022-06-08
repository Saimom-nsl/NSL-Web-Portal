import React from "react";

const FilterEmployee = ({ props, children }) => {
  return (
    <>
      <select
        class="form-select w-100"
        aria-label="Default select example"
        name="sortBy"
        id="sortBy"
      >
        <option selected disabled>Filter By</option>
        <option defaultValue={"firstName"}>Name</option>
        <option defaultValue={"joiningDate"}>Joining Date</option>
      </select>
      {/* <label htmlFor="sortBy">Sort By</label> */}
    </>
  );
};

export default FilterEmployee;
