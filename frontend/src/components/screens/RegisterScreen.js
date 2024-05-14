import React, { useEffect, useState } from 'react';
import { Button, Form,Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Message from '../Message'
import Loader from '../Loader'
import FormContainer from '../FormContainer';
import { register } from '../../Redux/user/userRegisterActions';

const RegisterScreen = () => {
    const userRegisterData = useSelector(state => state.userRegister)
    const dispatch = useDispatch()
    const [userRegisterInfo , setUserRegisterInfo] = useState({
        name:'',
        email:'',
        password :'',
        confirmPassword:'',
        massage : ''
    })
    const history = useNavigate()
    const loc = useLocation()
    const redirect = loc.search ? loc.search.split('=')[1] : '/'
    const {error, loading, userInfo} = userRegisterData
   

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])
    const chanageHandler = e =>{
        setUserRegisterInfo({
            ...userRegisterInfo,
            [e.target.name] : e.target.value
        })
    }
    const submitHandler = e =>{
        e.preventDefault()
        if(userRegisterInfo.password !== userRegisterInfo.confirmPassword){
            setUserRegisterInfo({
                ...userRegisterInfo,
                massage : 'password do not match'
            })
        }else{

            dispatch(register(userRegisterInfo))
        }
    }
    
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {userRegisterInfo.massage && <Message variant='danger'>{userRegisterInfo.massage}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='name'>
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control
                    required
                    type='name'
                    name='name'
                    placeholder='Enter your name'
                    value={userRegisterInfo.name}
                    onChange={chanageHandler}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    required
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    value={userRegisterInfo.email}
                    onChange={chanageHandler}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group className='mt-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    required
                    type='password'
                    name='password'
                    placeholder='password'
                    value={userRegisterInfo.password}
                    onChange={chanageHandler}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control
                    required
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm your password'
                    value={userRegisterInfo.confirmPassword}
                    onChange={chanageHandler}
                    >

                    </Form.Control>
                </Form.Group>
                <Button className='mt-3' type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account ? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Sing In</Link>
                </Col>
            </Row>
            
        </FormContainer>
    );
}

export default RegisterScreen;