const initialState = {
    loading:false,
    products : [],
    error : ""

}
export const topProductsReducer = (state=initialState,action)=>{
    switch(action.type){
        case "REQUEST_SEND":
            return{
                ...state,
                loading:true
            }
        case 'TOP_SUCCESS':
            return{
               
                loading:false,
                products: action.payload,
           
            }
        case 'TOP_FAIL':
            return{
               
                error : action.payload,
                loading:false
            }
        default : return state
    }
}