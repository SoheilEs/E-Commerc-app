import axios from "axios"
import { userLoginSuccess } from "./UserActions"
//User Registration acrions

const userRegisterRequst = ()=>{
    return{
        type:'USER_REGISTER_REQ',

    }
}
const userRegisterSuccess = (data)=>{
    return{
        type:'USER_REGISTER_SUCCESS',
        payload : data

    }
}
const userRegisterFail = (error)=>{

    return{
        type:'USER_REGISTER_FAIL',
        payload: error

    }
}

export const register = ({name, email, password}) =>{
    return async dispatch =>{
        dispatch(userRegisterRequst())
        const data = {
            headers:{
                'Content-type': 'application/json'
            },
            'name':name, 'email':email, 'password':password
        }
        await axios.post('api/users/register/',data)
        .then(res => {
            console.log(res)
            dispatch(userRegisterSuccess(res.data))
            dispatch(userLoginSuccess(res.data))
            localStorage.setItem('userInfo',JSON.stringify(res.data))
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(userRegisterFail(error))
        })
        
    }
}