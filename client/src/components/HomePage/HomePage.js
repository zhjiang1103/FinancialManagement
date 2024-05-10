import { useState, useEffect } from 'react'
import MovieCard from '../MovieCard';
import { fetchPopular } from '../../API';


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  
  // Make the GET request to fetch popular movies

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/books");

        const formattedMovies = await response.json();
        setMovies(formattedMovies);
        console.log(formattedMovies); // Log the formatted movies
        console.log (movies[0].volumeInfo.imageLinks.thumbnail)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(); // Call the fetchMovies function
    console.log (movies.volumeInfo)

  }, []); // The empty dependency array ensures the effect runs once
  
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  };

  return (
    <div>
      <input 
          className="search-bar"
          placeholder="search a book by title/author"
          type='text'
          value={search}
          onChange={handleSearchChange}
        />
      <div className='title'><h2>Popular Books</h2></div>
      
      <ul>
        <div className="movie-list">
        {
            movies.filter((item) => {

              if(!search) { //empty str is falsy(false). !false => true
                return true
              }

              const title = item?.volumeInfo?.title || "";
              const authors = item?.volumeInfo?.authors || [];
              const searchLower = search.toLowerCase();

              return (
                title.toLowerCase().includes(searchLower) || 
                authors.some(author => author.toLowerCase().includes(searchLower))
              );
            })

          .map((movie, index) => (
            
            <div className="movie-card">
              <li><MovieCard key={index}
                             img = {movie.volumeInfo.imageLinks?.thumbnail}
                             id = {movie?.id} /></li>
                             
            </div>
          ))}
        </div>
      </ul>
    </div>
  )
};


export default HomePage;

