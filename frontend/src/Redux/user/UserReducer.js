//User Login Reducer

const initialState = {
    loading:false,
    userInfo : [],
    error : ""

}
export const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case "USER_LOGIN_REQ":
            return{
                ...state,
                loading:true
            }
        case 'USER_LOGIN_SUCCESS':
            return{
               
                loading:false,
                userInfo: action.payload
            }
        case 'USER_LOGIN_FAIL':
            
            return{
               
                error : action.payload,
                loading:false
            }
        case 'USER_LOGOUT':{
            return{}
        }
        default : return state
    }
}

