import React, { useContext, useEffect, useState } from 'react'
import { getUserInfo } from '../../../API/user';
import { ProjectContext } from '../../../Context/createContext';
// import "../profile/profile.css";
const Profile = () => {
  const [userinfo, setUserInfo] = useState({});
  const { initialState,user} = useContext(ProjectContext);
  // console.log(user.token);
   useEffect(()=> {

    getUserInfo(user.token).then(data => {
      setUserInfo(data.data.data);
    })
  }, [])
  return (
    <div>
      <h2 style={{"textAlign":"center"}}>Profile Card</h2>

      <div className="card">
        <h1>{userinfo?.email}</h1>
        <p className="title">{userinfo?.role?.name}</p>
        {/* <p>Harvard University</p> */}
        <div style={{"margin": "24px 0"}}>
        </div>
        <p><button>Contact</button></p>
      </div>
    </div>
    
  )
}

export default Profile