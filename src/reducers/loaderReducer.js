let initialState = true;
const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADER_STATE':
            return action.state
        default:
            return state
    }
}

export default loaderReducer