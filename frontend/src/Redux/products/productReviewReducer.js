const initialState = {
    loading : false,
    error : '',
    success: false
}



export const productReviewsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'REVIEW_REQ':
            return {loading : true}
        case 'REVIEW_SUCCESS':
            return {
                loading:false,
                success : true
            }
        case 'REVIEW_FAIL':
            return {
                loading:false,
                error : action.payload
            }
        case 'REVIEW_RESET':
            return {}
        default : return state
    }
}