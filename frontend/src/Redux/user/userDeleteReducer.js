const initialState = {
    loading : false,
    result : '',
    error : '',
}



export const userDeleteReducer = (state = initialState, action) => {
    switch(action.type){
        case 'USER_DELETE_REQ': 
            return { 
                loading: true
            }
        case 'USER_DELETE_SUCCESS': 
       
            return { 
                loading: false,
                result : action.payload
            }
        case 'USER_DELETE_FAIL':
            return {
                error : action.payload,
                loading:false
            }
      
        default : return state
    }
}