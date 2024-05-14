const initialState = {
    loading:false,
    success:false,
    error : ''
}


export const orderPayRducer = (state = initialState, action) => {
    switch(action.type){
        case 'ORDER_PAY_REQ':
            return{
                ...state,
                loading:true
            }
        case 'ORDER_PAY_SUCCESS':
            return{
                ...state,
                loading : false,
                success : true
            }
        case 'ORDER_PAY_FAIL':
            return{
                loading: false,
                error : action.payload
            }
        case 'ORDER_PAY_RESET':
            return {}
        default : return state
    }
}