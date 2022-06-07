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
  
  useEffect(()=>{
    // let token = localStorage.getItem("token");

    if(localStorage.getItem("token")){
      getToken(JSON.parse(localStorage.getItem("token")))
    }
  },[]);
  
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