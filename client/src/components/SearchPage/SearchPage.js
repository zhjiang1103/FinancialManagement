import React from 'react'
import SearchBar from './SearchBar'
import Filtering from './Filtering'
import MovieCard from '../MovieCard'
import { fetchByTitle } from '../../API'
import { fetchByPerson } from '../../API'
import { useState, useEffect } from 'react'

const SearchPage = () => {
  const [searchWord, setSearchWord] = useState('')
 // const [person,setPerson] = useState([])
  const [movies, setMovies] = useState([])
  const [selectedSearch, setSelectedSearch] = useState(''); // State to store the selected search value

  const handleDropdownChange = (event) => {
    // Update the state with the selected value
    setSelectedSearch(event.target.value);
   
  };
  // useEffect(() => {
  //   // Log the updated selectedSearch in the console
  //   console.log(selectedSearch);
  // }, [selectedSearch]); // This effect runs when selectedSearch changes


  //Fetch api
  //search bar component
  //filtering component
  //movie card
  const onSubmit = (searchWord) => {
    setSearchWord(searchWord)
    console.log("Searchword", searchWord)
    if (selectedSearch === "title"){fetchMoviesByTitle(searchWord)}
    else if (selectedSearch === "person"){fetchMoviesByPerson(searchWord)}
   
  }
  // const onSubmit = (searchPerson) => {
  //     setPerson(searchPerson)
  //     console.log("person", person)
  //     fetchMoviesByPerson(person)
  // }

  const fetchMoviesByTitle = async (title) => {
    try {
      const response = await fetchByTitle(title)

      const formattedMovies = response.data.results;
      setMovies(formattedMovies);
      console.log("formattedMovies", formattedMovies); // Log the formatted movies
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  useEffect(() => {
    fetchMoviesByTitle()
  }, [searchWord]) // Call the fetchMoviesByTitle function
 // The title dependency array ensures the effect runs when title changes

  
  const fetchMoviesByPerson = async (person) => {
    try {
      const response = await fetchByPerson(person)

      const formattedMovies = response.data.results;
      setMovies(formattedMovies[0].known_for);
     console.log("formattedMovies", formattedMovies[0].known_for) // Log the formatted movies
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  useEffect(() => {
    fetchMoviesByPerson()
  }, [searchWord]) // Call the fetchMoviesByPerson function
  // The title dependency array ensures the effect runs when person changes


  return (
    <>
      <div>SearchPage</div>
   
      <div>
        {/* Dropdown component */}
        <select value={selectedSearch} onChange={handleDropdownChange}>
          <option value="">Search By</option>
          <option value="title">Movie Title</option>
          <option value="person">Person</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div><SearchBar onSubmit={onSubmit} /></div>
      <div><Filtering /></div>
      <div>
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

    </>
  )
}

export default SearchPage