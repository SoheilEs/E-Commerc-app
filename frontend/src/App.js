import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Container} from 'react-bootstrap'
import HomeScreens from "./components/screens/HomeScreens";
import { Route, Routes } from "react-router-dom";
import ProductScreen from "./components/screens/ProductScreen";
import { Provider} from "react-redux";
import store from "./Redux/store";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderScreen from "./components/screens/OrderScreen";
import UserListScreen from "./components/screens/UserListScreen";
import UserEditScreen from "./components/screens/UserEditScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import ProductEditScreen from "./components/screens/ProductEditScreen";
import OrderListScreen from "./components/screens/OrderListScreen";

function App() {
  return (
    <Provider store={store} >
        <div>
          <Header />
          <main className="py-3">
        <Container>
        <Routes>
            <Route path="/" element={<HomeScreens />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?"  element={<CartScreen />}/>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/productlist"  element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            
        </Routes>
        </Container>
          </main>
          <Footer />
        </div>
    </Provider>
  );
}

export default App;
