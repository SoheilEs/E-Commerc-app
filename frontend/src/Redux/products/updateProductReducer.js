const initialState = {
    loading:false,
    error: '',
    success : false ,
    product : {}
}

export const updateProductReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_REQ':
            return{
                loading: true
            }
        case 'UPDATE_SUCCESS':
            return{
                loading: false,
                success: true,
                product : action.payload
            }
        case 'UPDATE_FAIL':
            return{
                loading: false,
                error : action.payload
            }
        case 'UPDATE_RESET':
            return{
                product : {}
            }
        default : return state
    }
}