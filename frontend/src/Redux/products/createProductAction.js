import axios from "axios"

const createProductReq = () =>{
    return{
        type:'CREATE_PRODUCT_REQ'
    }
}

const createProductSuccess = (data) => {
    return {
        type:'CREATE_PRODUCT_SUCC',
        payload : data
    }
}

const createProductFail = (error) => {
    return {
        type : 'CREATE_PRODUCT_FAIL',
        payload : error
    }
}

export const createProductReset = () => {
    return {
        type : 'CREATE_PRODUCT_RESET'
    }
}

export const createProductApi = () => {
    return async (dispatch, getState) =>{
        dispatch(createProductReq())

        const {
            userState : {userInfo},
        
        } = getState()
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
         
        }

        await axios.post('/api/products/create/',{},config)
        .then(res => dispatch(createProductSuccess(res.data)))
        .catch(err => {
            const error =  err.response && err.response.data.detail
            ? err.response.data.detail : err.message
            dispatch(createProductFail(error))
        })
    }
}