import axios from "axios"


const orderPayRequest = () => {
    return{
        type:'ORDER_PAY_REQ'
    }
}
const orderPaySuccess = (data) => {
    return{
        type : 'ORDER_PAY_SUCCESS',
        payload:data
    }
}
const orderPayFail = (error) => {
    return{
        type:'ORDER_PAY_FAIL',
        payload: error
    }
}
export const orderPayRest = () => {
    return{
        type : 'ORDER_PAY_RESET'
    }
}

export const orderPayApi = (id, paymentResult) => async (dispatch, getState)=>{
    dispatch(orderPayRequest())
    const info = getState().userState
    const config ={
        headers :  {
            'Content-type': 'application/json',
            Authorization: `Bearer ${info.userInfo.token}`
        },
    }
    await axios.put(`/api/orders/${id}/pay/`,paymentResult,config)
    .then(res =>{
        dispatch(orderPaySuccess(res.data))
    })
    .catch(err => {
        const error =  err.response && err.response.data.detail
        ? err.response.data.detail : err.message
        dispatch(orderPayFail(error))
    })

}