import React, { useEffect, useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Message'
import Loader from '../Loader'
import FormContainer from '../FormContainer';
import { userDetail } from '../../Redux/user/userDetailActions';
import { useParams } from 'react-router-dom';
import { adminUserUpdateApi, adminUserUpdateReset } from '../../Redux/user/adminUserUpdateAction';


const UserEditScreen = () => {
    const userDetails = useSelector(state => state.userDetail)
    const adminUpdate = useSelector(state => state.adminUserUpdate)
    const {loading:updateLoading, error: updateError, success:successUpdate} = adminUpdate
    const dispatch = useDispatch()
 
    const params = useParams()
    const userID = params.id
    const history = useNavigate()

    const [userRegisterInfo , setUserRegisterInfo] = useState({
        name:'',
        email:'',
        isAdmin: false,
    })
    const {error, loading, user} = userDetails
   

    useEffect(()=>{
        if(successUpdate){
            dispatch(adminUserUpdateReset())
            history('/admin/userlist')
        }else{
            if(!user.name || user.id !== Number(userID)){
                dispatch(userDetail(userID))
            } else {
                setUserRegisterInfo({
                    name : user.name,
                    email : user.email,
                    isAdmin : user.isAdmin
                })
            }
        }

    },[dispatch,user,userID, successUpdate, history])
    const chanageHandler = e =>{


        if (e.target.name === "isAdmin"){
            setUserRegisterInfo({ ...userRegisterInfo,[e.target.name]: e.target.checked}) 
        } else {
            
            setUserRegisterInfo({
                ...userRegisterInfo,
                [e.target.name] : e.target.value
            })
        }
    }
    const submitHandler = e =>{
        e.preventDefault()
        dispatch(adminUserUpdateApi({
         id: user.id,
         name: userRegisterInfo.name,
         email: userRegisterInfo.email,
         isAdmin: userRegisterInfo.isAdmin
        }))
 
    }
    
    return ( updateLoading ? <Loader /> : updateError ? <Message variant='danger' >{updateError}</Message>:

        <div>

            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back 
            </Link>

            <FormContainer>
            <h1>Edit User</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>  :
                (<Form onSubmit={submitHandler} >
                    <Form.Group controlId='name'>
                        <Form.Label>Enter your name</Form.Label>
                        <Form.Control
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
                
                        type='email'
                        name='email'
                        placeholder='Enter Email'
                        value={userRegisterInfo.email}
                        onChange={chanageHandler}
                        >

                        </Form.Control>
                    </Form.Group>   
                    <Form.Group controlId='isadmin'>
                    
                        <Form.Check
                        label='Is Admin'
                        type='checkbox'
                        name='isAdmin'
                        checked={userRegisterInfo.isAdmin}
                        onChange={chanageHandler}
                        >

                        </Form.Check>
                    </Form.Group> 
                    <Button className='mt-3' type='submit' variant='primary'>Update</Button>
                </Form>)
             }
        </FormContainer>
        </div>
    );
}

export default UserEditScreen;