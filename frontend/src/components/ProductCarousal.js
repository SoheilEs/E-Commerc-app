import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Carousel, Image} from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import { topProductsApi } from '../Redux/products/topProductsAction';
import {Link} from 'react-router-dom'

const ProductCarousal = () => {
    const topProducts = useSelector(state => state.topProducts )
    
    const { error, loading, products} = topProducts

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(topProductsApi())
    },[dispatch])
    console.log(topProducts)
    return ( loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:
        <Carousel pause='hover' className='bg-dark'>
            {products.map(item => (
                <Carousel.Item key={item.id}>
                        <Link to={`/product/${item.id}`}>
                            <Image src={item.image} alt={item.name} fluid />
                            <Carousel.Caption className='carousel.caption'>
                                <h4>{item.name} (${item.price})</h4>
                            </Carousel.Caption>
                        </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousal;