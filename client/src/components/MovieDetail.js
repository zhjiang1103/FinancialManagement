import React from 'react'
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchByID,fetchFavDB,fetchFavPost, fetchFavDelete } from '../API';
import Heart from 'react-animated-heart';


const MovieDetail = (props) => {
  //get user email from props passed from parent component
  const { id } = useParams();
  const [isFavourite, setIsFavourite] = useState('false');
  const [movie, setMovie] = useState({});
  const [componentHasFetchedData, setComponentHasFetchedData] = useState(false)


  //Handle favorite button click event, call different http request based on user's behaviors
  const handleToggleFavourite = () => {
    setIsFavourite(!isFavourite);
    if(isFavourite){
      fetchFavDelete(props.user.email, id)
    }
    else{
      fetchFavPost(props.user.email, id)
    }
  };

  useEffect(() => {

    const fetchMovieByID = async () => {
      try {
        const response = await fetchByID(id)

        const formattedMovie = response.data;
        console.log("response", response.data)
        setMovie(formattedMovie);
        setComponentHasFetchedData(true)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovieByID(); // Call the fetchMovies function

    const fetchFav = async() =>{
      try {
        const response = await fetchFavDB(props.user.email, id)
        setIsFavourite(response.data.isFav);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    if(props.user?.email){fetchFav()};
    }
, [id, props.user?.email]); // The empty dependency array ensures the effect runs once

  let url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  let genres = movie.genres || [];

  if(!componentHasFetchedData) {
    return (<div> Loading ... </div>)
  }

  return (
    <>
      <div className='movieDetail'>
        <Card >
          <Card.Body >
            <Card.Img variant="top" src={url} style={{ width: '20%', height: '20%' }} />
            <Heart isClick={isFavourite} onClick={handleToggleFavourite} >Favourite</Heart>
            <div style={{ display: "flex", paddingLeft: '10px' }}>
              <Card.Title>{movie.title}</Card.Title>
            </div>
            <Card.Text>
              <div>
                <span><strong>Movie Description: </strong></span>
                <div className="new-line-description">{movie.overview}</div>
              </div>
              <div className="movie-category">
              <span className="category-label"><strong>Category:</strong></span>
    
              {genres.map(genre => (
                <div className="genres">
                  <ul> <li key={genre.id}> {genre.name}</li></ul>
                 
                </div>
              ))}
            </div>
            
            </Card.Text>

          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default MovieDetail