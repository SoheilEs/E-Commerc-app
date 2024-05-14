import axios from "axios"

const reviewRequest = () =>{
    return{
        type : 'REVIEW_REQ'
    }
}

const reviewSuccess = (data) =>{
    return{
        type : 'REVIEW_SUCCESS',
        payload: data
    }
}

const reviewFail = (error) =>{
    return{
        type : 'REVIEW_FAIL',
        payload: error
    }
}
export const reviewReset = () =>{
    return{
        type : 'REVIEW_RESET',
    }
}


export const reviewProductApi = (id, review) => async (dispatch, getState) =>{
    dispatch(reviewRequest())
    const {
        userState : {userInfo},
    
    } = getState()
    const data = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        },
    
    }
    await axios.post(`/api/products/${id}/reviews/`,review,data)
    .then(res => {
        dispatch(reviewSuccess(res.data))
    })
    .catch(err => {
        const error =  err.response && err.response.data.detail
        ? err.response.data.detail : err.message
        dispatch(reviewFail(error))
    })
}