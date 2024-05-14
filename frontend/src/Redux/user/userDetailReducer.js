const initialState = {
    loading : false,
    user :false,
    error : ''

}


export const userDetailReducer = (state=initialState, action) => {
    switch(action.type){
        case 'USER_DETAIL_REQ':
            return{
                ...state,
                loading:true
            }
        case 'USER_DETAIL_SUCCESS':
            return{
                user: action.payload,
                loading:false
            }
        case 'USER_DETAIL_FAIL':
            return{
                error : action.payload,
                loading:false
            }
        case 'USER_DETAIL_RESET':
            return {
                user :{}
            }
        default : return state
    }
}