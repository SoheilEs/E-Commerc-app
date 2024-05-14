import { combineReducers } from "redux";
import { cartReducer } from "./cart/cartReducer";
import {productsReducer, productReducer} from "./products/ProductsReducer";
import { userReducer } from "./user/UserReducer";
import { userRegisterReducer } from "./user/userRegisterReducer";
import { userDetailReducer } from "./user/userDetailReducer";
import { updateReducer } from "./user/userUpdateReducer";
import { orderCreateReducer } from "./order/orderReducer";
import { orderDetialReducer } from "./order/orderDetailReducer";
import { orderPayRducer } from "./order/orderUpdateReducer";
import { listOrderReducer } from "./order/listOrdersReducer";
import { userListReducer } from "./user/userListReducer";
import { userDeleteReducer } from "./user/userDeleteReducer";
import { adminUpdateReducer } from "./user/adminUserUpdateReducer";
import { deleteProductReducer } from "./products/deleteProductReducer";
import { createProductReducer } from "./products/createProductReducer";
import { updateProductReducer } from "./products/updateProductReducer";
import { orderListAdminReducer } from "./order/orderListAdminReducer";
import { orderDeliverdReducer } from "./order/orderDeliverdReducer";
import { productReviewsReducer } from "./products/productReviewReducer";
import { topProductsReducer } from "./products/topProductsReducer";



const rootReducer = combineReducers({
    prState:productsReducer,
    productState : productReducer,
    deleteProduct : deleteProductReducer,
    createProduct : createProductReducer,
    updateProduct : updateProductReducer,
    productReviews : productReviewsReducer,
    topProducts : topProductsReducer,

    cartState : cartReducer,
    userState : userReducer,

    userRegister : userRegisterReducer,
    userDetail : userDetailReducer,
    userUpdate : updateReducer,


    orderCreate : orderCreateReducer,
    orderDetails: orderDetialReducer,
    orderPay : orderPayRducer,
    orderList : orderListAdminReducer,
    orderDeliver : orderDeliverdReducer,
    
    listOrder: listOrderReducer,
    listUser : userListReducer,
    deleteUser : userDeleteReducer,
    adminUserUpdate : adminUpdateReducer,
})

export default rootReducer