import React from 'react';
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap' 

const Paginate = ({pages, page, keyword='', isAdmin=false}) => {

    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    console.log(keyword)
    console.log(page)

    return ( pages > 1 && (
        <Pagination>
           
            {
                [...Array(pages).keys()].map( x => 

                    
               
                   (
                    <div key={x + 1} >
                    <LinkContainer activeClassName=""  to={{search:!isAdmin ?
                    `keyword=${keyword}&page=${x + 1}` : `keyword=${keyword}&page=${x + 1}`
                    }} >
                        <Pagination.Item active={ x + 1 === page} >{x + 1}</Pagination.Item>
                    </LinkContainer>
                    </div>
                       

                    )
                )
                    
                }
                        
            
        </Pagination>
    )
        
    );
};

export default Paginate;