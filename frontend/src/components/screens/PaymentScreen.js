import React, { useEffect, useState } from 'react';
import { Button, Form, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../../Redux/cart/cartActions';
import CheckoutSteps from '../CheckoutSteps';
import FormContainer from '../FormContainer';
const PaymentScreen = () => {
    const cart = useSelector(state => state.cartState)
 
    const dispatch = useDispatch()
    const history = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!cart.shippingAddress.address){
        history('/shipping')
    }

    const submitHandler = e =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }
    useEffect(()=>{

    },[cart])
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        value={paymentMethod}
                        name = 'paymentMethod'
                        checked
                        onChange={ e => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>

                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;