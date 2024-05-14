const initailState = {
    loading : false,
    users : [],
    error : ''
}

export const userListReducer = (state=initailState, action) => {
    switch(action.type){
        case 'USER_LIST_REQ' : 
            return {
                ...state,
                loading : true
            }
        case 'USER_LIST_SUCCESS':
            return {
                loading : false,
                users : action.payload
            }
        case 'USER_LIST_FAIL':
            return{
                loading : false,
                error : action.payload
            }
        case 'USER_LIST_RESET':
            return {users:[]}
        default : return state
    }
}