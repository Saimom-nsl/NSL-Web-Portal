import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import {Accordion, AccordionItem, AccordionHeader, AccordionBody, UncontrolledAccordion, Button, Modal, ModalBody, Input, ModalFooter, } from "reactstrap"
import { createSkill, deleteASkillForAEmployee, getSkillForAEmployee } from '../../API/skill';
const Skill = ({own, user, token, employeeId}) => {
   const [toggle, setToggle] = useState(false);
   const [skills, setSkills] = useState([]);
   const [skillData, setSkillData] = useState({
     skillName: "",
     skillLevel: "",
     employeeId: "",
     isCreated: false,
   })
   const handleToggle = ()=> {
     setToggle(!toggle);
   }

   //deleting skill
   const handleDelete = (employeeId,id)=> {
     if(token && employeeId){
       deleteASkillForAEmployee(token, {employeeId: employeeId, skillId: id}).then(data=> {
        console.log(data); 
        setSkillData({...skillData, isCreated: isCreated? false: true})
       }).catch(err=> {
         console.log(err);
       })
     }
   }

   //creating skill
   const addToSkill = (e)=> {
     e.preventDefault();
     if(token && employeeId)
     createSkill(token, {skillLevel, skillName, employeeId}).then(data=> {
       setToggle(false);
       setSkillData({...skillData, isCreated: !skillData.isCreated});
     }).catch(err=> {
       console.log(err);
     })
   }

   const {skillLevel, skillName, isCreated} = skillData
   const handleChange = (e)=>{
     setSkillData({
       ...skillData, [e.target.name]: e.target.value
     });
   }
   useEffect(()=> {
     if(employeeId){
       getSkillForAEmployee(token, employeeId).then(data=> {
         const response = data.data.data;
         setSkills([...response]);
       }).catch(err=> {
         console.log(err);
       })
     }
   },[employeeId, token, isCreated])

  return (
    <>
    {(user.role.name === 'superadmin' || own===true) && <>
    <Button className='text-center' onClick={handleToggle}>Add Skill</Button>
      <Modal isOpen={toggle} size='sm' toggle={handleToggle}>
        <ModalBody>
          <form>
            <Input type='text' 
            placeholder='Skill Name' 
            name='skillName' 
            value={skillName}
            onChange={handleChange}
             />
            <Input type='select' 
            name='skillLevel'
            onChange={handleChange} 
            value={skillLevel} >
              {["Begainer", "Intermediate", "Advanced"].
              map(level=> <option value={level} key={level} >{level}</option>)}
            </Input>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type='submit' onClick={addToSkill}>Add</Button>
        </ModalFooter>
      </Modal>
    
    </> }
    <div className="d-flex justify-content center p-3">
      {skills.length > 0 ? <>
    <table className="table table-striped"  >
      <thead style={{"margin": "10px", "textAlign": "center"}}>
        <tr>
          <th scope="col">Skill</th>
          <th scope="col">Level</th>
          <th scope='col'>Action</th>
        </tr>
      </thead>
      <tbody style={{"margin": "10px", "textAlign": "center"}}>
      {skills.map(skill=> {
        return(
        <tr className="p-4" key={skill._id}>
          <td>{skill.skillName}</td>
          <td>{skill.skillLevel}</td>
          <td  >
            {/* <i className="fas fa-edit" title='Edit'></i> */}
            <i onClick={handleDelete(employeeId, skill._id)} className="fas fa-trash-alt" title='Delete'></i>
            </td>

        </tr>
        )
      })}
      </tbody>
    </table> </> : <span>No Skill Found</span> 
      }
  </div> 
    
    </>
    
  )
}

export default Skill