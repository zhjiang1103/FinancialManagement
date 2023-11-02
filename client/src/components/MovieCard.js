import React from 'react';
import Card from 'react-bootstrap/Card';
//import moment from 'moment';
//import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
//import FilmDetail from './FilmDetail';



//const ViewContact = ({contact, toUpdate, toDelete})
const MovieCard = (props) => {


    // const onUpdate = (toUpdateContact) => {
    //     toUpdate(toUpdateContact)
    // }

    // const onDelete = (toDeleteContact) => {
    //     toDelete(toDeleteContact)
    // }

    // Function to format the release date
    let url = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;

    return (
        <>


            <Card>
                <Card.Body>
                    <Link to={`/movies/${props.movie.id}`}>
                        <Card.Img variant="top" src={url} alt={props.movie.title} />
                    </Link>
                    <Card.Title>{props.movie.title}</Card.Title>
                    {/* <Link to={`/movies/${props.movie.id}`}>
                        <Button variant="outline-info" style={{ padding: '0.6em' }}>Movie Details</Button>
                    </Link> */}

                </Card.Body>

            </Card>



        </>
    )

}

export default MovieCard