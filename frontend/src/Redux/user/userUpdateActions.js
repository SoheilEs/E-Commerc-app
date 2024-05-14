import axios from "axios"
import { userLoginSuccess } from "./UserActions"

const userUpdateRequest = () =>{
    return{
        type:'USER_UPDATE_REQ'
    }
}
const userUpdateSuccess = (data) =>{
    return{
        type:'USER_UPDATE_SUCCESS',
        payload : data
    }
}
const userUpdateFail = (error) =>{
    return{
        type:'USER_UPDATE_REQ',
        payload : error
    }
}
export const userUpdateReset = () => {
    return {
        type : 'USER_UPDATE_RESET'
    }
}

export const userUpdate = (user) => {
    
    return async (dispatch,getState) =>{
        dispatch(userUpdateRequest())
        const info = getState().userState
        
        
        const config ={
            headers :  {
                'Content-type': 'application/json',
                Authorization: `Bearer ${info.userInfo.token}`
            },
        }
        
        await axios.put('api/users/profile/update/',user,config)
        .then(res => {
            console.log(res.data)
            dispatch(userUpdateSuccess(res.data))
            dispatch(userLoginSuccess(res.data))
            localStorage.setItem('userInfo',JSON.stringify(res.data))
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(userUpdateFail(error))
        } )
      
       
       
        
      
      
       
    }
}
