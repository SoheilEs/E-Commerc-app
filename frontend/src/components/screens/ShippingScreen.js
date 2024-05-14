import React, { useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps';
import FormContainer from '../FormContainer';
import { saveShippingAddress } from '../../Redux/cart/cartActions';

const ShippingScreen = () => {
    const cart = useSelector(state => state.cartState)
 
    const dispatch = useDispatch()
    const [shippingInfo, setShippingInfo] = useState({
        address: cart.shippingAddress.address,
        city : cart.shippingAddress.city,
        postalCode : cart.shippingAddress.postalCode,
        country : cart.shippingAddress.country,
    })
    const history = useNavigate()
    const chanageHandler = e =>{
        setShippingInfo({
            ...shippingInfo,
            [e.target.name] : e.target.value
        })
    }
    const submitHandler = e => {
        e.preventDefault()
        console.log('shipping submit')
        dispatch(saveShippingAddress(shippingInfo))
        history('/payment')
    }
    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler} >
            <Form.Group controlId='address'>
                    <Form.Label>Enter your address</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    name='address'
                    placeholder='Enter your address'
                    value={shippingInfo.address ? shippingInfo.address  : ''}
                    onChange={chanageHandler}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>Your City</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    name='city'
                    placeholder='Enter your city'
                    value={shippingInfo.city ? shippingInfo.city : ''}
                    onChange={chanageHandler}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    name='postalCode'
                    placeholder='Postal Code'
                    value={shippingInfo.postalCode ? shippingInfo.postalCode : ''}
                    onChange={chanageHandler}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    name='country'
                    placeholder='Country'
                    value={shippingInfo.country ? shippingInfo.country : ''}
                    onChange={chanageHandler}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;