import React, { useEffect } from 'react';
import { Button, Table} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../Message'
import Loader from '../Loader'
import { userListApi } from '../../Redux/user/userListAction';
import { userDeleteApi } from '../../Redux/user/userDeleteAction';



const UserListScreen = () => {
    const listUser = useSelector(state => state.listUser)
    const {error, loading, users} = listUser
    const userLogin = useSelector(state => state.userState)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.deleteUser )
    const {loading : deleteLoading, result, error:deleteError} = userDelete

    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){

            dispatch(userListApi())
        }else{
            history('/login')
        }
       
    },[dispatch,history, userInfo, result])
    const deleteHandler =(id)=>{
        if(window.confirm('Are you sure to delete this user !')){

            dispatch(userDeleteApi(id))
        }
    }
   
   
    return (
        <div>
           <h1>Users</h1>
           {deleteLoading ? <Loader /> : deleteError 
                ? <Message variant='danger'>{deleteError}</Message> 
                : result ? <Message variant='info'>{result}</Message>: null }
           {loading ? <Loader /> 
                    : error ? <Message variant='danger'>{error}</Message> 
                            : 
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>ADMIN</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isAdmin ? (
                                                    <i className='fas fa-check' style={{color:'green'}}></i>
                                                ):(
                                                    <i className='fas fa-check' style={{color:'red'}}></i>     
                                                )}</td>
                                                <td>
                                                    <LinkContainer to={`/admin/user/${user.id}/edit`}>
                                                        <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button onClick={()=>deleteHandler(user.id)} variant='danger' className='btn-sm'>
                                                        <i className='fas fa-trash'></i>
                                                        </Button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
           }

        </div>
    );
};

export default UserListScreen;