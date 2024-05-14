import axios from "axios"

const userListRequest = () => {
    return{
        type : 'USER_LIST_REQ'
    }
}

const userListSuccess = (data) => {
    return {
        type : 'USER_LIST_SUCCESS',
        payload : data
    }
}
const userListFail = (error) => {
    return {
        type : 'USER_LIST_FAIL',
        payload : error
    }
}
export const userListRest = () => {
    return{
        type:'USER_LIST_RESET'
    }
}

export const userListApi = () => {
    return async (dispatch, getState )=>{
        dispatch(userListRequest())
        const {
            userState : {userInfo},

        } = getState()
        const data = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
       
        } 
        await axios.get('/api/users',data)
        .then(res => {
            dispatch(userListSuccess(res.data))})
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(userListFail(error))
        })
    }
}