import React, {useReducer, createContext } from 'react'
import App from '../App'
import { reducer } from '../Reducer/reducer'

export const ProjectContext = createContext()

let initialState = {
    user: [],
    msg: null,
    toggle: false
}

const Createcontext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setMsg = (message) => {
      return dispatch({
          type: 'GET_MESSAGE',
          data: message
      })
  }
  return (
    <ProjectContext.Provider value={{ ...state, setMsg,initialState}}>
        <App />
    </ProjectContext.Provider>
  )
}

export default Createcontext