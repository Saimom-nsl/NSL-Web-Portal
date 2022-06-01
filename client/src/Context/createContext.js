import React, {useReducer, createContext ,useEffect} from 'react'
import App from '../App'
import Cookies from 'js-cookie'
import { reducer } from '../Reducer/reducer'

export const ProjectContext = createContext()

let initialState = {
    user: {},
    token:'',
    msg: null,
    toggle: false
}



const Createcontext = () => {
  // useEffect(()=>{
  //   initialState.token = Cookies.get('jwtoken')
  // },[])
  const [state, dispatch] = useReducer(reducer, initialState);
  const setMsg = (message) => {
      return dispatch({
          type: 'GET_MESSAGE',
          data: message
      })
  }
  const userInfo = (user)=>{
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

  return (
    <ProjectContext.Provider value={{ ...state, setMsg,initialState,userInfo, userlogout}}>
        <App />
    </ProjectContext.Provider>
  )
}

export default Createcontext