import axios from "axios"

const oderDetialRequest = () => {
    return{
        type:'ORDER_DETAIL_REQ'
    }
}
const orderDetailSuccess = (data) => {
    return{
        type : 'ORDER_DETAIL_SUCCESS',
        payload:data
    }
}
const orderDetailFail = (error) => {
    return{
        type:'ORDER_DETAIL_FAIL',
        payload: error
    }
}

export const orderDetailFetch = (id) => {
    return async (dispatch, getState )=>{
        dispatch(oderDetialRequest())
        const info = getState().userState
        const config ={
            headers :  {
                'Content-type': 'application/json',
                Authorization: `Bearer ${info.userInfo.token}`
            },
        }
        await axios.get(`/api/orders/${id}`,config)
        .then(res => {
            dispatch(orderDetailSuccess(res.data))
        })
        .catch( err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(orderDetailFail(error))
        })
    }
}
