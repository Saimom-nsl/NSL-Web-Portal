import React, { useState } from 'react'
import {Accordion, AccordionItem, AccordionHeader, AccordionBody, UncontrolledAccordion, } from "reactstrap"
const Skill = () => {
    // const [index, setIndex] = useState('1');
    // const handleAccordion = newIndex => {
    //     if(index === newIndex){
    //         setIndex(null)
    //     }else{
    //         setIndex(index)
    //     }
    // }
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
    <AccordionItem>
      <AccordionHeader targetId="1">
        Salary Recipt
      </AccordionHeader>
      <AccordionBody accordionId="1">
        <strong>
          This is the first item's accordion body.
        </strong>
        You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
        <code>
          .accordion-body
        </code>
        , though the transition does limit overflow.
      </AccordionBody>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader targetId="2">
        Accordion Item 2
      </AccordionHeader>
      <AccordionBody accordionId="2">
        <strong>
          This is the second item's accordion body.
        </strong>
        You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
        <code>
          .accordion-body
        </code>
        , though the transition does limit overflow.
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
  </UncontrolledAccordion>
</div>
  )
}

export default Skill