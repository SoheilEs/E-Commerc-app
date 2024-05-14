import React, { useEffect, useState } from 'react';
import { Button, Form,Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../Message'
import Loader from '../Loader'
import { userDetail } from '../../Redux/user/userDetailActions';
import { userUpdate, userUpdateReset } from '../../Redux/user/userUpdateActions';
import { listOrderApi } from '../../Redux/order/listOrdersActions';

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const userDetails = useSelector(state => state.userDetail)
    const userLogin = useSelector(state => state.userState)
    const userUpdateProfile = useSelector(state => state.userUpdate)
    const orderListMy = useSelector(state => state.listOrder)
    const { loading:loadingOrders, error: errorOrders, orders } = orderListMy
    const dispatch = useDispatch() 
    const history =useNavigate()
    const {error, loading, user} = userDetails
    const {userInfo} = userLogin
    const {success} = userUpdateProfile

    useEffect(()=>{
        
        if(!userInfo){
            history('/login')
        }else{
           
            if(!user || !user.name || success || userInfo.id !== user.id){
            
                dispatch(userUpdateReset())
                dispatch(userDetail('profile'))
                dispatch(listOrderApi())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo, user, success])

    const submitHandler = e =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage(
                 'Password do not match'
            )
        }else{
            dispatch(userUpdate({
                'id':user.id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }
    console.log(orders)
    return (
        
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
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
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group className='mt-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                   
                    type='password'
                    name='password'
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control
                    
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Button className='mt-3' type='submit' variant='primary'>Update</Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {
                    loadingOrders ? (
                        <Loader />
                    ): errorOrders ? (
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.createdAt.substring(0,10)}</td>
                                        <td>${item.totalPrice}</td>
                                        <td>{item.isPaid ? item.paidAt.substring(0,10) : (
                                            <i className='fas fa-times' style={{color:'red'}}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/order/${item.id}`} >
                                                <Button className='btn-sm'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                }
            </Col>
        </Row>
    );
};

export default ProfileScreen;