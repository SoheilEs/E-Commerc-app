const initialState = {
    selectedItems : [],
    error : "",
    shippingAddress:{},
}


export const cartReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'CART_ADD_ITEM':
            const item = action.payload
            const existItem = state.selectedItems.find( x => x.id === item.id)
            if(existItem){
                return{
                    ...state,
                    selectedItems: state.selectedItems.map(x => 
                        x.id === existItem.id ? item : x
                        ),
                }
            }else{
                return{
                    ...state,
                    selectedItems : [...state.selectedItems,item],
          
                }
            }
        case "CART_REMOVE_ITEM":
            return{
                ...state,
                selectedItems : state.selectedItems.filter(x => x.id !== action.payload )
            }
        case 'PRODUCT_DETAILES_FAIL':
            return{
                error : action.payload
            }
        case 'SAVE_SHIPPING_ADDRESS':
            return{
                ...state,
                shippingAddress:action.payload
            }
        case 'SAVE_PAYMENT_METHOD':
            return{
                ...state,
                paymentMethod : action.payload
            }
        case 'CART_CLEAR_ITEM':{
            return{
                ...state,
                selectedItems : []
            }
        }
        
        default: return state
    }
}