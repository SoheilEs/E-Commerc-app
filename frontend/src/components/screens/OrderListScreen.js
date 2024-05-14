import React, { useEffect } from 'react';
import { Button, Table} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../Message'
import Loader from '../Loader'
import { orderListApi } from '../../Redux/order/orderListAdminAction';



const OrderListScreen = () => {
    const listOrders = useSelector(state => state.orderList)
    const {error, loading, orders} = listOrders
    const userLogin = useSelector(state => state.userState)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.deleteUser )
    const {loading : deleteLoading, result, error:deleteError} = userDelete

    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){

            dispatch(orderListApi())
        }else{
            history('/login')
        }
       
    },[dispatch,history, userInfo])
  
   
   console.log(orders)
    return (
        <div>
           <h1>Orders</h1>
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
                                            <th>USER</th>
                                            <th>DATE</th>
                                            <th>total</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.user && item.user.name}</td>
                                                <td>{item.createdAt.substr(0,10)}</td>
                                                <td>${item.totalPrice}</td>
                                                <td>{item.isPaid ? (
                                                    item.paidAt.substr(0,10)
                                                    ):(
                                                    <i className='fas fa-check' style={{color:'red'}}></i>     
                                                    )}
                                                </td>
                                                <td>{item.isDeliverd ? (
                                                    item.deliverAt.substr(0,10)
                                                    ):(
                                                    <i className='fas fa-check' style={{color:'red'}}></i>     
                                                    )}
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/order/${item.id}`}>
                                                        <Button variant='dark' className='btn-sm'>
                                                            Details
                                                        </Button>
                                                    </LinkContainer>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
           }

        </div>
    );
};

export default OrderListScreen;