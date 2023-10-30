import React from 'react'

import SearchBar from './SearchBar'
import Filtering from './Filtering'
import MovieCard from '../MovieCard'
import {fetchByTitle} from '../../API'
import { useState, useEffect } from 'react'

const SearchPage = () => {
  const[title, setTitle] = useState([])
  const[movies, setMovies] = useState([])

  //Fetch api
//search bar component
//filtering component
//movie card
const onSubmit = (searchTitle) =>{
  setTitle(searchTitle)
  console.log("title",title)
  fetchMoviesByTitle(title)
}
  
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
useEffect(()=>{
  fetchMoviesByTitle()},[title]) // Call the fetchMoviesByTitle function
 // The empty dependency array ensures the effect runs once


  return (
    <>
    <div>SearchPage</div>

    <div><SearchBar onSubmit={onSubmit}/></div>
    <div><Filtering/></div>
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