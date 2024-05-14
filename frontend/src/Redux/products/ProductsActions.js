import axios from "axios"

const fetchReqSend = () =>{
    return {
        type:'REQUEST_SEND',
    }
}
const fetchSuccess = (data) =>{
    return {
        type:'SUCCESS',
        payload:data
    }
}
const fetchFail = (error) =>{
    return {
        type:'FAIL',
        payload:error
    }
}


const fetchProductSend = () =>{
    return {
        type:'PRODUCT_REQUEST',
    }
}
export const fetchProductSuccess = (data) =>{
    
    return {
        type:'PRODUCT_SUCCESS',
        payload:data
    }
}
const fetchProductFail = (error) =>{
    return {
        type:'PRODUCT_FAIL',
        payload:error
    }
}


export const fechApi =  (keyword = '') =>{
    return async (dispatch)=>{
        dispatch(fetchReqSend())
        await axios.get(`/api/products${keyword}`)
        .then(res=>{
            
            dispatch(fetchSuccess(res.data))
        })
        .catch(err=>{
           
            dispatch(fetchFail(
                err.response && err.response.data.detail 
                ? err.response.data.detail : err.message
                ))
        })
    }
}
export const fechProductApi =  (id) =>{
    return async (dispatch)=>{
        dispatch(fetchProductSend())
        await axios.get(`/api/products/${id}`)
        .then(res=>{
           
            dispatch(fetchProductSuccess(res.data))
        })
        .catch(err=>{
           
            dispatch(fetchProductFail(
                err.response && err.response.data.detail 
                ? err.response.data.detail : err.message
            ))
        })
    }
}