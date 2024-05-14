import axios from "axios"


const orderDeliverReq = () => {
    return {
        type : 'DELIVER_REQ'
    }
}

const orderDeliverSuccess = (data) => {
    return {
        type : 'DELIVER_SUCCESS',
        payload : data
    }
}

const orderDeliverFail = (error) => {
    return {
        type : 'DELIVER_FAIL',
        payload :  error
    }
}

export const orderDeliverReset = () =>{
    return {
        type : 'DELIVER_RESET'
    }
}


export const orderDeliveredApi = (order)=>{
    return async (dispatch, getState) => {
        dispatch(orderDeliverReq())
        const info = getState().userState
        const config ={
            headers :  {
                'Content-type': 'application/json',
                Authorization: `Bearer ${info.userInfo.token}`
            },
        }
        await axios.put(`/api/orders/${order.id}/deliver/`,{},config)
        .then(res =>{
            dispatch(orderDeliverSuccess(res.data))
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(orderDeliverFail(error))
        })
    }
}