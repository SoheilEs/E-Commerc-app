import axios from "axios"

const listOrderRequest = () => {
    return {
        type :'LIST_ORDER_REQUEST'
    }
}

const listOrderSuccess = (data) => {
    return{
        type: 'LIST_ORDER_SUCCESS',
        payload : data
    }
}

const listOrderFail = (error) => {
    return {
        type : 'LIST_ORDER_FAIL',
        payload : error
    }
}
export const listOrderRest = ()=>{
    return{
        type : 'LIST_ORDER_RESET'
    }
}
export const listOrderApi = () => {
    return async (dispatch,getState) => {
        dispatch(listOrderRequest())
        const info = getState().userState
        const config ={
            headers :  {
                'Content-type': 'application/json',
                Authorization: `Bearer ${info.userInfo.token}`
            },
        }

        axios.get('api/orders/myorders/',config)
        .then(res => {
            dispatch(listOrderSuccess(res.data))
        })
        .catch(err =>{
            const error =  err.response && err.response.data.detail
        ? err.response.data.detail : err.message
        dispatch(listOrderFail(error))
        })


    }
}