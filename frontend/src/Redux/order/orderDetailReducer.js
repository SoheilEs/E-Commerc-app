
const initialState = {
    loading:true,
    orderItems:[],
    shippingAddress : {}
}




export const orderDetialReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'ORDER_DETAIL_REQ':
            return{
                ...state,
                loading:true,
            }
        case 'ORDER_DETAIL_SUCCESS':
            return{
                loading:false,
                order: action.payload
            }
        case 'ORDER_DETAIL_FAIL':
            return{
                loading:false,
                error : action.payload
            }
        default: return state
    }
}