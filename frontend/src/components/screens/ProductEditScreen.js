import React, { useEffect, useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Message'
import Loader from '../Loader'
import FormContainer from '../FormContainer';

import { useParams } from 'react-router-dom';
import { fechProductApi } from '../../Redux/products/ProductsActions';
import { updateProductApi, updateProductReset } from '../../Redux/products/updateProductAction';
import axios from 'axios';



const ProductEditScreen = () => {
 
    const productDetails = useSelector(state => state.productState)
    const dispatch = useDispatch()

    const updatedProduct = useSelector(state => state.updateProduct)
    console.log(updatedProduct)
    const {loading: updateLoading, success:updateSuccess, error:updateError } = updatedProduct
 
    const params = useParams()
    const productID = params.id
    const history = useNavigate()

    const [productEdit , setProductEdit] = useState({
        name:'',
        price:0,
        image: '',
        brand : '',
        category : '',
        countInStock : 0,
        description: '',
    
    })

    const [uploading, setUploading] = useState(false)
    const {error, loading, product} = productDetails
   

    useEffect(()=>{
        if(updateSuccess){
            dispatch(updateProductReset())
            history('/admin/productlist')
        }else{
            if(!product.name || product.id !== Number(productID)){
                dispatch(fechProductApi(productID))
            }else{
                setProductEdit({
                    name: product.name,
                    price:product.price,
                    image: (product.image ? product.image : ''  ),
                    brand : product.brand,
                    category : product.category,
                    countInStock : product.countInStock,
                    description: product.description,
                })
            }
        }
    },[dispatch, history,product,productID, updateSuccess])

    const submitHandler = e =>{
        e.preventDefault()
        dispatch(updateProductApi({
            id: productID,
            name: productEdit.name,
            price:productEdit.price,
            image: productEdit.image,
            brand :productEdit.brand,
            category : productEdit.category,
            countInStock : productEdit.countInStock,
            description: productEdit.description,
            
        }))
    }
    const chanageHandler = e =>{
        setProductEdit({
            ...productEdit,
            [e.target.name] : e.target.value
        })
    }
    const uploadFileHandler = async event => {
        const file  = event.target.files[0]
    
        const formData = new FormData() 
        formData.append('image', file)
        formData.append('product_id', productID)
       
     
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data',

            }
        }
        await axios.post('/api/products/upload/', formData, config)
        .then(res => {
            setProductEdit({
                ...productEdit,
                image : res.data
            })
            setUploading(false)
        })
        .catch(err => setUploading(false))

    }
    console.log(productEdit)
    return (

        <div>

            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back 
            </Link>

            <FormContainer>
            <h1>Edit Product</h1>
            {updateLoading && <Loader />}
            {updateError && <Message variant='danger'>{updateError}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>  :
                (<Form onSubmit={submitHandler} >
                    <Form.Group controlId='name'>
                        <Form.Label>Product name</Form.Label>
                        <Form.Control
                        type='name'
                        name='name'
                        value={productEdit.name}
                        onChange={chanageHandler}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                
                        type='number'
                        name='price'
                        value={productEdit.price}
                        onChange={chanageHandler}
                        >

                        </Form.Control>
                    </Form.Group> 
                   
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                            type='text'
                            placeholder='Enter Image'
                            value={productEdit.image}
                            name = 'image'
                            onChange={chanageHandler}
                            >
                            </Form.Control>
                            <Form.Group controlId="formFile" className="mb-3">
                           
                                <Form.Control 
                                type="file"
                                onChange={uploadFileHandler}
                                 />
                             </Form.Group>
                            {uploading && <Loader />}
                         
                        </Form.Group>
                   

                    
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                
                        type='text'
                        name='brand'
                        value={productEdit.brand}
                        onChange={chanageHandler}
                        >

                        </Form.Control>
                    </Form.Group>   
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                
                        type='text'
                        name='category'
                        placeholder='Category'
                        value={productEdit.category}
                        onChange={chanageHandler}
                        >

                        </Form.Control>
                    </Form.Group> 
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                
                        type='number'
                        name='countInStock'
                        value={productEdit.countInStock}
                        onChange={chanageHandler}
                        >

                        </Form.Control>
                    </Form.Group> 
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                
                        type='text'
                        name='description'
                        value={productEdit.description}
                        onChange={chanageHandler}
                        >

                        </Form.Control>
                    </Form.Group> 
                    
                
                    <Button className='mt-3' type='submit' variant='primary'>Update</Button>
                </Form>)
             }
        </FormContainer>
        </div>
    );
}

export default ProductEditScreen;