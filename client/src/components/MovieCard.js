import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const MovieCard = ({title, img, id}) => {
//get movie info from parent component by using props
    
    return (
        <>


            <Card>
                <Card.Body>
                    <Link to={`/movies/${id}`}>
                        <Card.Img variant="top" src={img} />
                        
                    </Link>
                    <Card.Title>{title}</Card.Title>
    

                </Card.Body>

            </Card>



        </>
    )

}

export default MovieCard


