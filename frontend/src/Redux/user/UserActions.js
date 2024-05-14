import axios from "axios"
import { listOrderRest } from "../order/listOrdersActions"
import { userDetailRest } from "./userDetailActions"
import { userListRest } from "./userListAction"


//user Login actions
const userLoginRequst = ()=>{
    return{
        type:'USER_LOGIN_REQ',

    }
}
export const userLoginSuccess = (data)=>{
    return{
        type:'USER_LOGIN_SUCCESS',
        payload : data

    }
}
const userLoginFail = (error)=>{

    return{
        type:'USER_LOGIN_FAIL',
        payload: error

    }
}
 const userLogout = ()=>{
    return{
        type:'USER_LOGOUT',

    }
}

export const login = ({email,password}) =>{
     
    return async (dispatch) =>{
        dispatch(userLoginRequst())
        const data = {
            headers:{
                'Content-type': 'applications/json'
            },
            'username':email, 'password':password
        }
        await axios.post('api/users/login/',data)
        .then(res => {

            console.log(['RES in userState : '],res)
            dispatch(userLoginSuccess(res.data))
            localStorage.setItem('userInfo',JSON.stringify(res.data))
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(userLoginFail(error))
        })
        
    }
}

export const logout  = () => {
    return dispatch => {
        localStorage.removeItem('userInfo')
        dispatch(userLogout())
        dispatch(userDetailRest())
        dispatch(listOrderRest())
        dispatch(userListRest())
    }
}

