export const listOrderReducer = (state = {orders:[]}, action) => {
    switch(action.type){
        case 'LIST_ORDER_REQUEST':
            return{
                loading : true
            }
        case 'LIST_ORDER_SUCCESS':
            return{
                loading:false,
                orders : action.payload
            }
        case 'LIST_ORDER_FAIL':
            return{
                loading:false,
                error : action.payload
            }
        case 'LIST_ORDER_RESET':
            return{orders:[]}
        default: return state
    }
}