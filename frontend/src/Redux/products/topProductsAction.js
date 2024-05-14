import axios from "axios"

const topReqSend = () =>{
    return {
        type:'TOP_REQUEST_SEND',
    }
}
const topSuccess = (data) =>{
    return {
        type:'TOP_SUCCESS',
        payload:data
    }
}
const topFail = (error) =>{
    return {
        type:'TOP_FAIL',
        payload:error
    }
}


export const topProductsApi =  () =>{
    return async (dispatch)=>{
        dispatch(topReqSend())
        await axios.get('/api/products/top/')
        .then(res=>{
            
            dispatch(topSuccess(res.data))
        })
        .catch(err=>{
           
            dispatch(topFail(
                err.response && err.response.data.detail 
                ? err.response.data.detail : err.message
                ))
        })
    }
}