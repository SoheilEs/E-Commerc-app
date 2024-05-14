const initialState = {
    loading:false,
    error : '',

}


export const orderDeliverdReducer = (state=initialState, action) => {
    switch(action.type){
        case'DELIVER_REQ':
            return{
                loading : true
            }
        case'DELIVER_SUCCESS':
            return{
                loading : false,
                success : true
            }
        case'DELIVER_FAIL':
            return{
                loading : false,
                error : action.payload
            }
        case 'DELIVER_RESET':
            return {}
        default : return state
    }
}