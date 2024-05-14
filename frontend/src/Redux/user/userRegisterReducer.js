//User REGISTER Reducer

const initialState = {
    loading:false,
    userInfo : false,
    error : ""

}
export const userRegisterReducer = (state=initialState,action)=>{
    switch(action.type){
        case "USER_REGISTER_REQ":
            return{
                ...state,
                loading:true
            }
        case 'USER_REGISTER_SUCCESS':
            return{
               
                loading:false,
                userInfo: action.payload
            }
        case 'USER_REGISTER_FAIL':
            
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

