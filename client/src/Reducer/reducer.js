export const reducer = (state,action) => {
    if (action.type === 'GET_MESSAGE') {
        state.msg = action.data
        return { ...state, msg: state.msg }
    }
}