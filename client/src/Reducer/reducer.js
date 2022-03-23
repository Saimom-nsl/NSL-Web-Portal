export const reducer = (state,action) => {
    switch (action.type) {
        case 'GET_MESSAGE':
            state.msg = action.data
            return { ...state, msg: state.msg }
        case 'USER_INFO':
            state.user.push (action.payload)
            console.log(state.user);
            return {...state,user:state.user}
        default:
            return {...state}
    }

}