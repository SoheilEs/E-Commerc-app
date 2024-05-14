import React, { useEffect, useState }  from 'react';
import { Row, Col, ListGroup, Image, Card, ListGroupItem, Button} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { orderDetailFetch } from '../../Redux/order/orderDetailActions';
import { orderPayApi, orderPayRest } from '../../Redux/order/orderUpdateActions';
import {PayPalButton} from 'react-paypal-button-v2'
import { orderDeliveredApi, orderDeliverReset} from '../../Redux/order/orderDeliverdAction';


const OrderScreen = () => {
    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: deliverLoading, success: delverSuccess, error: deliverError} = orderDeliver

    const userLogin = useSelector(state => state.userState )
    const {userInfo} = userLogin

    const orderDetail = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetail
    
    const dispatch = useDispatch()
    const orderId = useParams().id

    const [sdkReady, setSdkReady] = useState(false)
    
    const orderPay = useSelector(state => state.orderPay)

    const {loading:loadingPay, success:successPay} = orderPay

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc,item)=> acc + item.price * item.qty ,0).toFixed(2)
    }
    

    const addPayPalScript = ()=>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AWcZLSSq2s16Kg9Ou_f9BXAqSf7lmxrDfWSsIBQxkhxmPkvsFvfSV1RCpeWZfrjJPL76E6apMvGTKWJq'
        script.async =true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    const history = useNavigate()
    useEffect(()=>{
        if(!userInfo){
            history('/login')
        }
        if(!order || successPay || order.id !== Number(orderId)  || delverSuccess){
            dispatch(orderPayRest())
            dispatch(orderDeliverReset())
            dispatch(orderDetailFetch(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    },[dispatch,order, orderId, successPay, delverSuccess])

    const successPaymentHandler = (paymentResult) =>{
        dispatch(orderPayApi(orderId, paymentResult))
    }
    const deliverSubmitHandler = () =>{
        dispatch(orderDeliveredApi(order))
    }

    return loading ? (
        <Loader />
    ): error ? (
        <Message variant='danger'>{error}</Message>
    ):(
        <div>
            <h1>Order: {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, { order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '} 
                                {order.shippingAddress.country}
                            </p>
                            {
                                order.isDeliverd ? (
                                    <Message variant='success'>Delivered on {order.deliverAt}</Message>
                                ): (
                                    <Message variant='warning'>Not Delivered</Message>
                                )
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.peymentMethod}
                            </p>
                            {
                                order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                ): (
                                    <Message variant='warning'>Not Paid</Message>
                                )
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? 
                            <Message variant='info'>Order is empty</Message>
                            : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image  src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                            ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay  && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />

                                    ):(
                                       <PayPalButton 
                                        amount={order.totalPrice}
                                        onSuccess ={successPaymentHandler}
                                        /> 
                                    )}
                                </ListGroupItem>    
                            )}
                      
                        </ListGroup>
                        {deliverLoading && <Loader />}
                        {deliverError && <Message variant='danger'>{deliverError}</Message>}
                        {
                            userInfo && userInfo.isAdmin && order.isPaid && !order.isDeliverd && (
                                <ListGroup.Item>
                                    <div className="d-grid gap-2">
                                        <Button 
                                        type='button'  
                                        variant="primary" 
                                        onClick={deliverSubmitHandler}
                                        >
                                            Mark as Delivered
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            )
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderScreen;