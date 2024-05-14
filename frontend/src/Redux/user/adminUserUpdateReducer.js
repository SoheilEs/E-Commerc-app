const initialState = {
    loading : false,
    user : {},
    error : '',
}



export const adminUpdateReducer = (state = initialState, action) => {
    switch(action.type){
        case 'UPDATE_REQ_SEND': 
            return { 
                loading: true
            }
        case 'UPDATE_REQ_SUCCESS': 
            return { 
                loading: false,
                success : true
            }
        case 'UPDATE_REQ_FAIL':
            return {
                error : action.payload,
                loading:false
            }
        case 'UPDATE_REQ_RESET':
            return { 
                user:{}
            }
        default : return state
    }
}