import axios from "axios"

import { userDetailSuccess } from "./userDetailActions"

const adminUserUpdateReq = () => {
    return{
        type : 'UPDATE_REQ_SEND'
    }
}

const adminUserUpdateSuccess = (data) =>{
    return {
        type : 'UPDATE_REQ_SUCCESS',
        payload : data
    }
}

const adminUserUpdateFail = error => {
    return {
        type : 'UPDATE_REQ_FAIL',
        payload : error
    }
}
export const adminUserUpdateReset =  () => {
    return {
        type : 'UPDATE_REQ_RESET',
    }
}


export const adminUserUpdateApi = (user)=>{
    return async (dispatch, getState) => {
        dispatch(adminUserUpdateReq())
        const info = getState().userState
        
        
        const config ={
            headers :  {
                'Content-type': 'application/json',
                Authorization: `Bearer ${info.userInfo.token}`
            },
        }
        await axios.put(`/api/users/update/${user.id}/`,user,config)
        .then(res => {
           console.log(res.data)
            dispatch(adminUserUpdateSuccess())
            dispatch(userDetailSuccess(res.data))
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(adminUserUpdateFail(error))
        } )
    }
}