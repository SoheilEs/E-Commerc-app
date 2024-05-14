import axios from "axios"
import { fetchProductSuccess } from "./ProductsActions"


const updateProductReq = () => {
    return{
        type : 'UPDATE_REQ'
    }
}

const updateProductSuccess = (data) =>{
    return {
        type : 'UPDATE_SUCCESS',
        payload : data
    }
}

const updateProductFail = error => {
    return {
        type : 'UPDATE_FAIL',
        payload : error
    }
}

export const updateProductReset = () =>{
    return{
        type : 'UPDATE_RESET'
    }
}



export const updateProductApi = (product)=>{
    return async (dispatch, getState) => {
        dispatch(updateProductReq())
        const info = getState().userState
        
        
        const config ={
            headers :  {
                'Content-type': 'application/json',
                Authorization: `Bearer ${info.userInfo.token}`
            },
        }
        await axios.put(`/api/products/update/${product.id}/`,product,config)
        .then(res => {
          
            dispatch(updateProductSuccess(res.data))
            dispatch(fetchProductSuccess(res.data))
            
        })
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(updateProductFail(error))
        } )
    }
}