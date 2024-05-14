import axios from "axios"

const deleteProductReq = () => {
    return{
        type : 'DELETE_PRODCUT_REQ'
    }
}
const deleteProductSuccess = () => {
    return{
        type : 'DELETE_PRODCUT_SUCCESS',
    }
}
const deleteProductFail = (error) => {
    return{
        type : 'DELETE_PRODCUT_FAIL',
        payload : error
    }
}


export const deleteProductApi = id => {
    return async (dispatch, getState) => {
        dispatch(deleteProductReq())
        const {
            userState : {userInfo},
        
        } = getState()
        const data = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        
        }
        await axios.delete(`/api/products/delete/${id}/`,data)
        .then(res => {
            console.log(res.data)
            dispatch(deleteProductSuccess())
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(deleteProductFail(error))
        })

    }
}

