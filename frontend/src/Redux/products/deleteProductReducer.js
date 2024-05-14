const initialState = {
    loading : false,
    success : false,
    error : ''
}

export const deleteProductReducer = (state = initialState, action) => {
    switch(action.type){
        case 'DELETE_PRODUCT_REQ':
            return { loading :true}
        case 'DELETE_PRODCUT_SUCCESS':
            return{
                loading:false,
                success : true
            }
        case 'DELETE_PRODCUT_FAIL':
            return{
                loading:false,
                error : action.payload
            }
        default : return state
    }
}