import React, { useEffect } from 'react';
import { Row, Col} from 'react-bootstrap';
import Product from '../Product';
import { useDispatch, useSelector } from 'react-redux';
import { fechApi } from '../../Redux/products/ProductsActions';
import Loader from '../Loader';
import Message from '../Message';
import { useLocation } from 'react-router-dom';
import Paginate from '../Paginate';
import ProductCarousal from '../ProductCarousal';
const HomeScreens = () => {
    const products = useSelector(state => state.prState)
    const dispatch = useDispatch()

    const location = useLocation()
   

    let keyword = location.search
   
    useEffect(()=>{
        dispatch(fechApi(keyword))
    },[dispatch, keyword])
   
    return (
        <div>
        {!keyword && <ProductCarousal />}
          
            <h1>Latest Products</h1>
            {
                products.loading ? <Loader/>: products.error ? <Message variant='danger'>{products.error}</Message>:
                <div>
                    <Row >
                    { products.products.map(item=>(
                        <Col key={item.id} sm={12} md={6} lg={4} xxl={3}>
                            <Product product={item} />
                        </Col>
                    ))}
                    </Row>
                    <Paginate page={products.page} pages={products.pages}  keyword={keyword} />
                </div>

             }
        </div>
    );
};

export default HomeScreens;