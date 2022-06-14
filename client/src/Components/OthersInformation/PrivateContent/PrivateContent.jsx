import React from 'react'
import AdminUploadedData from './AdminUploadedData'
import EmployeeUploadedData from './EmployeeUploadedData'

const PrivateContent = () => {
  return (
    <>
        <span>Hr</span>
        <AdminUploadedData />
        <hr />
        <span>Your</span>
        <EmployeeUploadedData />
    </>
  )
}

export default PrivateContent