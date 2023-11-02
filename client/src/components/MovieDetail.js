import React from 'react'
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchByID } from '../API';
import Heart from 'react-animated-heart';


const MovieDetail = () => {
  const { id } = useParams();

  const [isFavourite, setIsFavourite] = useState('false');
  const [movie, setMovie] = useState({});
  // Make the GET request to fetch popular movies

  const handleToggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {

    const fetchMovieByID = async () => {
      try {
        const response = await fetchByID(id)

        const formattedMovie = response.data;
        setMovie(formattedMovie);
        console.log(formattedMovie); // Log the formatted movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovieByID(); // Call the fetchMovies function


  }, [id]); // The empty dependency array ensures the effect runs once

  let url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  let genres = movie.genres;



  return (
    <>
      <div className='movieDetail'>
        <Card>
          <Card.Body >
          <Card.Img variant="top" src={url} style={{ width: '20%', height: '20%' }} />
          <Heart isClick={isFavourite} onClick={handleToggleFavourite} >Favourite</Heart>
          <div style={{ display: "flex" ,paddingLeft: '10px' }}>
            <Card.Title>{movie.title}</Card.Title>
            
              </div>
            <Card.Text>
              <div>
                <span>Movie Description: </span>
                <div className="new-line-description">{movie.overview}</div>
              </div>
              {/* <div className="movie-category">
              <span className="category-label">Category:</span>
              {genres.map(genre => (
                <div className="genres">
                  <li key={genre.id}> {genre.name}</li>
                </div>
              ))}
            </div> */}
            </Card.Text>

          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default MovieDetail