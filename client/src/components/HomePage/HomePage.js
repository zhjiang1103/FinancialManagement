import { useState, useEffect } from 'react'
import MovieCard from '../MovieCard';
import MovieClip from '../MovieClip';
import { fetchPopular } from '../../API';







const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const videoId = ["6JnN1DmbqoU", "GYOQBfT8UU4", "uY4efoSe-Kc", "rYY5QdEGEZw", "UqcGdmJJVTY", "hyyyKcfJRGQ", "cg5z7wgOUig", "V2fJv2omoZU"]
  // Generate a random index between 0 and the length of the videoIds array
  const randomIndex = Math.floor(Math.random() * videoId.length);
  // Select the video ID at the random index
  const randomVideoId = videoId[randomIndex];
  
  // Make the GET request to fetch popular movies

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        const response = await fetchPopular()

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
      <div className='centered-video'>
        <MovieClip videoId={randomVideoId} />
      </div>
      <div className='title'><h2>Popular Movies</h2></div>
      
      <ul>
        <div className="movie-list">
          {movies.map(movie => (
            <div className="movie-card">
              <li key={movie.id}><MovieCard movie={movie} /></li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  )
};


export default HomePage;

