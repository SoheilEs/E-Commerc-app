import React, { useEffect, useState } from 'react';
import { Link, useNavigate }     from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../Rating';
import { priceRound} from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { fechProductApi } from '../../Redux/products/ProductsActions';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';
import { reviewProductApi, reviewReset} from '../../Redux/products/productReviewAction';

const ProductScreen = () => {
    const[qty, setQty] = useState(1)
    const[rating, setRating] = useState(0)
    const[comment, setComment] = useState('')

    const products = useSelector(state=> state.productState)

    const productReview = useSelector(state => state.productReviews)
    const {loading, success, error} = productReview

    const userLogin = useSelector(state => state.userState )
    const { userInfo } = userLogin


    const dispatch = useDispatch()
    const params = useParams()
    const prodID = params.id
    const history =useNavigate()
    useEffect(()=>{
        if(success){
            setRating(0)
            setComment('')
            dispatch(reviewReset())
        }
        dispatch(fechProductApi(prodID))
    },[dispatch,prodID, success])
   
    const addToCartHandler = () =>{
            history(`/cart/${params.id}?qty=${qty}`)
    }
    const submitHandler = e =>{
        e.preventDefault()
        dispatch(reviewProductApi(
            prodID,
            {
                rating : rating,
                comment : comment
            }
        ))
        console.log('FORM SUBMITED')
    }
    
    return (
        <>
            
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {products.loading ? <Loader /> : products.error ? <Message variant="danger">{products.error}</Message>: 
            <div>
                <Row>
                    <Col className='text-center' md={4}>
                        <Image style={{width:'300px',height:'300px',textAlign:'center'}} src={products.product.image} alt={products.product.name} fluid />
                    </Col>
                    <Col md={5}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{products.product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={products.product.rating} text={`${products.product.numReviews} reviews`} color={'#f8e825'} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${priceRound(products.product.price)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {products.product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${priceRound(products.product.price)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {products.product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {products.product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col xs="auto" className='my-1'>
                                                <Form.Select
                                    
                                                value={qty}
                                                onChange={(e)=>setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(products.product.countInStock).keys()].map(x=>(
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <div className="d-grid gap-2">
                                        <Button 
                                        onClick={addToCartHandler}
                                        disabled={products.product.countInStock<=0}>
                                                Add to Cart
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <h4>Reviews</h4>
                        {products.product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                        <ListGroup variant='flush'>
                                    {products.product.reviews.map(review => (
                                        <ListGroup.Item key={review.id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating}  color='#f8e825'/>
                                                <p>{review.createdAt.substr(0,10)}</p>
                                                <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                        <ListGroup.Item>
                                            <h4>Write a review</h4>
                                            {loading && <Loader />}
                                            {error && <Message variant='danger'>{error}</Message>}
                                            {success && <Message variant='success'>Review Submitted</Message>}
                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Select
                                                        
                                                        value={rating}
                                                        onChange = {e => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control
                                                        as='textarea'
                                                        rows='5'
                                                        value={comment}
                                                        onChange = {e => setComment(e.target.value)}
                                                        >

                                                        </Form.Control>
                                                                
                                                    </Form.Group>
                                                    <Button type='submit' value='primary' disabled={loading}>
                                                        Submit
                                                    </Button>
                                                </Form>
                                            ):(
                                                <Message variant='info'>Please <Link to ='/login'>Login</Link> to write a review</Message>
                                            )}
                                            
                                        </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </div>
            }
        </div>
        </>
        
    );
};

export default ProductScreen;