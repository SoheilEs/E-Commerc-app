import axios from "axios"

const userDeleteReq = () => {
    return{
        type : 'USER_DELETE_REQ',
    }
}
const userDeleteSuccess = (data) => {
    console.log(data)
    return{
        type : 'USER_DELETE_SUCCESS',
        payload : data
    }
}
const userDeleteFail = (error) => {
    return{
        type : 'USER_DELETE_FAIL',
        payload : error
    }
} 


export const userDeleteApi = (id) => {
    return async (dispatch, getState) => {
        dispatch(userDeleteReq)
        const {
            userState : {userInfo},

        } = getState()
        const data = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
       
        } 

        await axios.delete(`/api/users/delete/${id}`,data)
        .then(res => {
           
            dispatch(userDeleteSuccess(res.data))
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(userDeleteFail(error))
        })


    }
}
