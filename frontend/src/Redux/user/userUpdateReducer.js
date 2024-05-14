const initailState = {
    loading : false,
    userInfo : false,
    error : ''
}

export const updateReducer = (state=initailState, action) => {
    switch(action.type){
        case 'USER_UPDATE_REQ' : 
            return {
                ...state,
                loading : true
            }
        case 'USER_UPDATE_SUCCESS':
            return {
                loading : false,
                success : true,
                userInfo : action.payload
            }
        case 'USER_UPDATE_FAIL':
            return{
                loading : false,
                error : action.payload
            }
        case 'USER_UPDATE_RESET':
            return {}
        default : return state
    }
}