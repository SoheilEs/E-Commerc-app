const initialState = {
    loading : false,
    error : '',
    orders : []
}

export const orderListAdminReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ORDER_LIST_REQ':
            return{
                loading : true
            }
        case 'ORDER_LIST_SUCCESS':
            return{
                loading : false,
                orders : action.payload
            }
        case 'ORDER_LIST_FAIL':
            return{
                loading : false,
                error : action.payload
            }
        default : return state
    }
}