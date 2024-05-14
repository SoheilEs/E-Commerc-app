import React from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { priceRound } from '../helper';
import Rating from './Rating';

const Product = ({product}) => {
   
    return (
        <Card  className='my-3 p-3 rounded' >
            <Link style={{textAlign:'center'}} to={`/product/${product.id}`}>
                <Card.Img style={{width:'120px',height:'110px'}} variant="top" src={product.image} />
            </Link>
            <Card.Body >
                <Link to={`/product/${product.id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong> 
                    </Card.Title>
                 </Link>
                 <Card.Text as="div">
                    <div className='my-3'>
                        
                        <Rating   value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                 </Card.Text>
                 <Card.Text as="h3">
                   ${priceRound(product.price)}
                 </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;