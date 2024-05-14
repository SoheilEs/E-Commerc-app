import axios from 'axios'
import { cartClearItem } from '../cart/cartActions'
const orderCreateRequest = () => {
    return {
        type : 'ORDER_CREATE_REQ'
    }
}

const orderCreateSuccess = (data) => {
    return {
        type : 'ORDER_CREATE_SUCCESS',
        payload : data
    }
}

const orderCreateFail = (error) => {
    return {
        type : 'ORDER_CREATE_FAIL',
        payload : error
    }
}

export const orderCreateReset = () => {
    return{
        type : 'ORDER_CREATE_RESET'
    }
}




export const createOrder = (order) => {
    return async (dispatch,getState) => {
        dispatch(orderCreateRequest())
        const info = getState().userState
    
        const config ={
            headers :  {
                'Content-type': 'application/json',
                Authorization: `Bearer ${info.userInfo.token}`
            },
        }
        
        await axios.post('api/orders/add/',order,config)
        .then(res => {
            console.log(res.data)
            dispatch(orderCreateSuccess(res.data))
            dispatch(cartClearItem())
            localStorage.removeItem('selectedItems')
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(orderCreateFail(error))
        })
    }
}