import React, { useEffect, useState } from 'react';
import { Button, Form,Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/user/UserActions';
import Message from '../Message'
import Loader from '../Loader'

import FormContainer from '../FormContainer';

const LoginScreen = () => {
    const loc = useLocation()
    const history = useNavigate()
    const [userData, setUserData] = useState({
        email : '',
        password : ''
    })
    const userLogin = useSelector(state => state.userState )
    const {error, loading, userInfo} = userLogin

    const dispatch = useDispatch()
    
    const redirect = loc.search ? loc.search.split('=')[1] : '/'
   
    useEffect(()=>{
       
        if(userInfo){
            history(redirect)
        }
    },[history, userInfo, redirect])
    const submitHandler = e =>{
        e.preventDefault()
        dispatch(login(userData))
        

    }
    const chanageHandler = e =>{
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
    }
    console.log(userLogin)
    return (
       <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    value={userData.email}
                    onChange={chanageHandler}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group className='mt-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    name='password'
                    placeholder='password'
                    value={userData.password}
                    onChange={chanageHandler}
                    >

                    </Form.Control>
                </Form.Group>
                <Button className='mt-3' type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
       </FormContainer>
    );
};

export default LoginScreen;