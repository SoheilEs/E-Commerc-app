import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap'
import {useLocation, useNavigate} from 'react-router-dom'
const SearchBox = () => {

    const [keyword, setKeyword] = useState('')
    const history = useNavigate()
    const location =useLocation()

    const submitHandler = e =>{
        e.preventDefault()
        if(keyword){
            history(`/?keyword=${keyword}&page=1`)
        }else{
            history(location.pathname)
        }
    }

    return (
        <Form className="d-flex" onSubmit={submitHandler}>
            <Form.Control
            type='text'
            name='keyword'
            value={keyword}
            onChange={ e => setKeyword(e.target.value)}
            className = "mr-sm-2  ml-sm-5"
            >

            </Form.Control>
            <Button type="submit" variant='outline-success' className='p-2 mx-2'>
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;