export const orderCreateReducer = (state={}, action) => {
    switch(action.type){
        case 'ORDER_CREATE_REQ':
            return{
                loading : true,
            }
        case 'ORDER_CREATE_SUCCESS':
            return{
                loading: false,
                success : true,
                order : action.payload
            }
        case 'ORDER_CREATE_FAIL':
            return{
                loading:false,
                error : action.payload
            }
        case 'ORDER_CREATE_RESET':
            return {}
        default : return state
    }
}
