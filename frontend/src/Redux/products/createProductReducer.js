const initialState = {
    loading:false,
    error:'',
    success:false,
    product : []
}


export const createProductReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CREATE_PRODUCT_REQ':
            return{
                loading : true
            }
        case 'CREATE_PRODUCT_SUCC':
            return{
                loading:false,
                success : true,
                product : action.payload

            }
        case 'CREATE_PRODUCT_FAIL':
            return{
                loading:false,
                error : action.payload
            }
        case 'CREATE_PRODUCT_RESET':
            return {}
        default : return state
    }
}