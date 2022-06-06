export const reducer = (state,action) => {
    switch (action.type) {
        case 'TOGGLE':{
            state.toggle = action.payload;
        }
        case 'GET_TOKEN':{
            state.token = action.payload;
        }
        case 'GET_MESSAGE':
            state.msg = action.data
            return { ...state, msg: state.msg }
        case 'USER_INFO':
            state.user = action.payload
            // console.log(state.user);
            return {...state,user:state.user}
        case 'USER_LOGOUT':
            state.user = null;
            return {...state}
        default:
            return {...state}
    }

}