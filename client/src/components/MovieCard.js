import React from 'react';
import Card from 'react-bootstrap/Card';
//import moment from 'moment';
import Button from 'react-bootstrap/Button';
//import { Route, Routes, Link, useParams } from 'react-router-dom';
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
        <div>
         
            <Card>
                <Card.Body>
                <Card.Img variant="top" src={url} alt={props.movie.title} />
                    <Card.Title>{props.movie.title}</Card.Title>
                </Card.Body>
            
            </Card>
        </div>
             

        </>
    )

}

export default MovieCard