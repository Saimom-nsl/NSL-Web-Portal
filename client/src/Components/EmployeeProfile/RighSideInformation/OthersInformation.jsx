import jwtDecode from 'jwt-decode'
import React, { useContext, useState } from 'react'
import {Accordion, AccordionItem, AccordionHeader, AccordionBody, UncontrolledAccordion, } from "reactstrap"
import { ProjectContext } from '../../../Context/createContext'
import PrivateContent from '../../OthersInformation/PrivateContent/PrivateContent'
import Skill from '../../Skill/Skill'


const OthersInformation = ({employee}) => {
    const {user, token} = useContext(ProjectContext);
    const userToken = JSON.parse(localStorage.getItem("token"))
    const tokenuser = jwtDecode(userToken);
  return (
    <div>
        <UncontrolledAccordion
    // defaultOpen={[
    //     '1',
    //     '2',
    //     '3'
    //   ]}
    // toggle={handleAccordion }
  >
        {(tokenuser?.role?.name === "superadmin" || tokenuser.email === employee.email) && <>    <AccordionItem>
      <AccordionHeader targetId="1">
        Confidential
      </AccordionHeader>
      <AccordionBody accordionId="1">
        <div>Upload File</div>
          <PrivateContent />
      </AccordionBody>
    </AccordionItem></> }
    {/* <AccordionItem>
      <AccordionHeader targetId="1">
        Confidential
      </AccordionHeader>
      <AccordionBody accordionId="1">
          Private Content
      </AccordionBody>
    </AccordionItem> */}
    <AccordionItem>
      <AccordionHeader targetId="2">
      Skill
      </AccordionHeader>
      <AccordionBody accordionId="2">
      <Skill token={userToken} employeeId={employee._id} user={tokenuser} own={tokenuser.email === employee.email ? true : false} />

      </AccordionBody>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader targetId="3">
        Accordion Item 3
      </AccordionHeader>
      <AccordionBody accordionId="3">
        <strong>
          This is the third item's accordion body.
        </strong>
        You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
        <code>
          .accordion-body
        </code>
        , though the transition does limit overflow.
      </AccordionBody>
    </AccordionItem>
  </UncontrolledAccordion></div>
  )
}

export default OthersInformation