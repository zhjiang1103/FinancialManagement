import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
//get movie info from parent component by using props
    let url = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;

    return (
        <>


            <Card>
                <Card.Body>
                    <Link to={`/movies/${props.movie.id}`}>
                        <Card.Img variant="top" src={url} alt={props.movie.title} />
                    </Link>
                    <Card.Title>{props.movie.title}</Card.Title>
    

                </Card.Body>

            </Card>



        </>
    )

}

export default MovieCard