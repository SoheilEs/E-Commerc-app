const initialState = {
    loading:false,
    products : [],
    error : ""

}
export const productsReducer = (state=initialState,action)=>{
    switch(action.type){
        case "REQUEST_SEND":
            return{
                ...state,
                loading:true
            }
        case 'SUCCESS':
            return{
               
                loading:false,
                products: action.payload.products,
                page : action.payload.page,
                pages : action.payload.pages
            }
        case 'FAIL':
            return{
               
                error : action.payload,
                loading:false
            }
        default : return state
    }
}

export const productReducer = (state={product:{reviews:[]}},action)=>{
    switch(action.type){
        case 'PRODUCT_REQUEST':
            return{
                ...state,
                loading:true,
                
            }
        case 'PRODUCT_SUCCESS':
        
            return{
                loading:false,
                product: action.payload
            }
            case 'PRODUCT_FAIL':
                return{
                    loading:false,
                    error: action.payload
                }
            default : return state
    }
}
