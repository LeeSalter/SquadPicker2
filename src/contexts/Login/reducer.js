export const reducer = (state, action) => {
    switch(action.type){
        case "LOGGED_IN":
            return {...state,
            authenticated:true}
        case "LOGGED_OUT":
            return {...state,
            authenticated:false}
        default:
            return state;
    }
}

export const initialState={
    authenticated:false
}