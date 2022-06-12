import React, {useReducer, createContext ,useEffect} from 'react'
import App from '../App'
// import Cookies from 'js-cookie'
import { reducer } from '../Reducer/reducer'
export const ProjectContext = createContext()

let initialState = {
    user: {},
    token:'',
    // msg: null,
    // toggle: false
}



const Createcontext = () => {
const token = localStorage.getItem("token");  
  useEffect(()=>{
    // let token = localStorage.getItem("token");

    if(token){
      getToken(JSON.parse(token))
    }
  },[token]);
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const setMsg = (message) => {
      return dispatch({
          type: 'GET_MESSAGE',
          data: message
      })
  }

  const getToken = tok => {
    return dispatch({
      type: 'GET_TOKEN',
      payload: tok
    })
  }

  const userInfo = user =>{
    return dispatch({
      type:'USER_INFO',
      payload:user
    })
  }
  const userlogout = () => {
    return dispatch({
      type: "USER_LOGOUT",
      payload: {}
    })
  }
  // const tokendecoder = tok => {
  //   return dispatch({
  //     type: "TOKEN_DECODER",
  //     payload: tok
  // }

  // const setToggle = ()=> {
  //   return dispatch({
  //     type: 'TOGGLE',
  //     payload: toggle
  //   })
  // }

  return (
    <ProjectContext.Provider value={{ ...state, setMsg,userInfo, userlogout, getToken}}>
        <App />
    </ProjectContext.Provider>
  )
}

export default Createcontext