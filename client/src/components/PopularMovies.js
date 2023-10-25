import { useState, useEffect} from 'react'
import axios from 'axios';


// import ViewFilm from './ViewFilm'

// import { Route, Routes, Link, useParams } from 'react-router-dom';


const PopularMovies = () => {
    const [movies, setMovies] = useState([]);

  
      // Make the GET request to fetch popular movies
      
  useEffect(() => {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

   
const apiKey= process.env.REACT_APP_API_KEY
    const fetchMovies = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: 'application/json',
          },
        });

        const formattedMovies = response.data.results; 
        setMovies(formattedMovies);
        console.log(formattedMovies); // Log the formatted movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(); // Call the fetchMovies function

  }, []); // The empty dependency array ensures the effect runs once
  
    return (
      <div>
        <h2>Popular Movies</h2>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>{movie.original_title}</li>
          ))}
        </ul>
      </div>
    )};
  
  
  export default PopularMovies;

