import React, { useEffect } from 'react';
import { Button, Table, Row, Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '../Message'
import Loader from '../Loader'
import { fechApi } from '../../Redux/products/ProductsActions'
import { deleteProductApi } from '../../Redux/products/deleteProductAction';
import { createProductApi, createProductReset } from '../../Redux/products/createProductAction';
import Paginate from '../Paginate';



const ProductListScreen = () => {
    const productList = useSelector(state => state.prState)
  
    const {error, loading, products, page, pages} = productList
    const userLogin = useSelector(state => state.userState)
    const { userInfo } = userLogin

    const deletedProduct = useSelector( state => state.deleteProduct)
    const {loading:deleteLoading, success: deleteSuccess, error : deleteError} = deletedProduct


    const createProduct = useSelector(state => state.createProduct)
    const { loading: createLoading, success:createSussess, product:createdProduct, error:createError} = createProduct
    const keyword = useLocation().search
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(()=>{
        dispatch(createProductReset())
        if(!userInfo.isAdmin){
                history('/login')
        }

        if(createSussess){
            history(`/admin/product/${createdProduct.id}/edit`)
        }else{
            dispatch(fechApi(keyword))
        }
       
    },[dispatch,history, userInfo , deleteSuccess, createSussess, createdProduct, keyword])


    const deleteHandler =(id)=>{
        if(window.confirm('Are you sure to delete this Product !')){

          dispatch(deleteProductApi(id))
        }
    }
    const createProductHandler = () =>{
        dispatch(createProductApi())
    }
   
    return (
        <div>
           <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product 
                    </Button>
                </Col>
           </Row>
            {deleteLoading ? <Loader /> 
                            :deleteError ? <Message variant="danger">{deleteError}</Message> :null}


            {createLoading && <Loader />}
            {createError && <Message variant='danger'>{createError}</Message>}


           {loading ? <Loader /> 
                    : error ? <Message variant='danger'>{error}</Message> 
                            : 
                            <div>
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>PRICE</th>
                                            <th>CATEGORY</th>
                                            <th>BRAND</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>${item.price}</td>
                                                <td>{item.category}</td>
                                                <td>{item.brand}</td>
                                                <td>
                                                    <LinkContainer to={`/admin/product/${item.id}/edit`}>
                                                        <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button onClick={()=>deleteHandler(item.id)} variant='danger' className='btn-sm'>
                                                        <i className='fas fa-trash'></i>
                                                        </Button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Paginate page={page} pages={pages}  isAdmin={true} />
                            </div>
           }

        </div>
    );
};

export default ProductListScreen;