import axios from "axios"


const cartAddItem = (data) =>{
    return{
        type:"CART_ADD_ITEM",
        payload: data

    }
}
export const cartClearItem = () => {
    return{
        type : 'CART_CLEAR_ITEM'
    }
}

export const cartRmoveItem = (id) =>(dispatch,getState)=>{
    
        dispatch({
            type:"CART_REMOVE_ITEM",
            payload: id
        })
       
        localStorage.setItem('selectedItems',JSON.stringify(getState().cartState.selectedItems))
    
}


export const fetchCartItem = (id, qty) => {
  
    return async (dispatch, getState) =>{
     
        await axios.get(`/api/products/${id}`)
        .then( res => {
        
            dispatch(cartAddItem({
                ...res.data
                ,qty:qty}))
            localStorage.setItem('selectedItems',JSON.stringify(getState().cartState.selectedItems))
        })
        .catch(err => dispatch({
            type: 'PRODUCT_DETAILES_FAIL',
            payload : (err.response && err.response.data.detail 
                        ? err.response.data.detail:err.message)
        }))
    }
}

export const saveShippingAddress = data  =>  dispatch =>{
        dispatch({
            type:'SAVE_SHIPPING_ADDRESS',
            payload: data
        })
        localStorage.setItem('shippingAddress',JSON.stringify(data))
    }
export const savePaymentMethod = (data)=> dispatch=>{
    dispatch({
        type:'SAVE_PAYMENT_METHOD',
        payload:data
    })
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}
