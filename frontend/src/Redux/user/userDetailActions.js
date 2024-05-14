import axios from "axios"

const userDetailRequest = () => {
    return{
        type : 'USER_DETAIL_REQ'
    }
}

export const userDetailSuccess = (data) => {
    return {
        type : 'USER_DETAIL_SUCCESS',
        payload : data
    }
}
const userDetailFail = (error) => {
    return {
        type : 'USER_DETAIL_FAIL',
        payload : error
    }
}
export const userDetailRest = () => {
    return{
        type:'USER_DETAIL_RESET'
    }
}

export const userDetail = (id) => {
    return async (dispatch, getState )=>{
        dispatch(userDetailRequest())
        const {
            userState : {userInfo},

        } = getState()
        const data = {
            headers:{
                'Content-type': 'applications/json',
                Authorization: `Bearer ${userInfo.token}`
            },
       
        } 
        await axios.get(`/api/users/${id}/`,data)
        .then(res => {
            console.log('[user Detial action]',res.data)
            dispatch(userDetailSuccess(res.data))})
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(userDetailFail(error))
        })
    }
}