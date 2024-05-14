import axios from "axios"

const orderListReq = () =>{
    return{
        type : 'ORDER_LIST_REQ'
    }
}

const orderListSuccess = (data) =>{
    return{
        type : 'ORDER_LIST_SUCCESS',
        payload : data
    }
}

const orderListFail = (error) =>{
    return{
        type : 'ORDER_LIST_SUCCESS',
        payload : error
    }
}

export const orderListApi = () => async (dispatch, getState) => {
    dispatch(orderListReq())
    const info = getState().userState
    const config ={
        headers :  {
            'Content-type': 'application/json',
            Authorization: `Bearer ${info.userInfo.token}`
        },
    }
    await axios.get('/api/orders/',config)
    .then(res => dispatch(orderListSuccess(res.data)))
    .catch(err => {
        const error =  err.response && err.response.data.detail
        ? err.response.data.detail : err.message
        dispatch(orderListFail(error))
    })
}
