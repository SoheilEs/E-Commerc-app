import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { cartRmoveItem, fetchCartItem } from '../../Redux/cart/cartActions';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../Message';
import queryString from 'query-string'

const CartScreen = () => {
    const params = useParams()
    const location = useLocation()
    
    const querystring = queryString.parse(location.search)
    const qty = querystring.qty
    const cartItem = useSelector(state=>state.cartState)
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(()=>{
        if(params.id){
            dispatch(fetchCartItem(params.id,qty))
        }
       
     },[dispatch, params.id, qty])
   
    const checkoutHandler = ()=>{
       
        history('/login?redirect=/shipping')
    }
    const removeFromCartHandler = (id) => {
        console.log('[before]',cartItem.selectedItems)
        dispatch(cartRmoveItem(id))
        console.log('[after]',cartItem.selectedItems)

    }
    console.log(cartItem.selectedItems)
    return (
        <div>

            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItem.selectedItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty ! <Link to='/'>Go Back</Link>
                        </Message>
                    ):(
                        <ListGroup variant='flush'>
                            {cartItem.selectedItems.map(item=>
                           ( 
                            <ListGroup.Item key={item.id}>
                           
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Select
                                           
                                            value={item.qty}
                                            onChange={(e)=>{
                                
                                            dispatch(fetchCartItem(item.id, e.target.value))
                                            }
                                            }>
                                            {
                                                [...Array(item.countInStock).keys()].map(x=>(
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Col md={1} >
                                            <Button
                                            type='button'
                                            variant='light'
                                            onClick={()=> removeFromCartHandler(item.id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            )
                            )}
                        </ListGroup>
                    )}
                   
                </Col>
                <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Subtotal ({cartItem.selectedItems.reduce((acc, item)=> acc + Number(item.qty), 0)}) items</h2>
                                        ${cartItem.selectedItems.reduce((acc, item)=> acc + Number(item.qty) * item.price, 0).toFixed(2)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                    <div className="d-grid gap-2">
                                    <Button 
                                    type='button'
                                    disabled={cartItem.selectedItems.length===0}
                                    onClick ={checkoutHandler}
                                    >
                                       Proceed to Checkout
                                    </Button>
                                </div>
                                    </ListGroup.Item>
                            </ListGroup>
                        </Card>
                </Col>
            </Row>
  
        </div>
    );
};

export default CartScreen;