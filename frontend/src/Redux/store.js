import {applyMiddleware, createStore} from 'redux'
import rootReducer from './rootReduce'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const cartItemsFromStroge = localStorage.getItem('selectedItems') ?
    JSON.parse(localStorage.getItem('selectedItems')) : []

const userInfoFromStroge = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStroge = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStroge = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : null
const initialState = {
    cartState : {
        selectedItems :cartItemsFromStroge,
        shippingAddress: shippingAddressFromStroge,
        paymentMethod : paymentMethodFromStroge,
     },
    userState : {userInfo : userInfoFromStroge}
}



const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(thunk)))
export default store