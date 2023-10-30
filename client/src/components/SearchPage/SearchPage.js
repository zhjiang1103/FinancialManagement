import React from 'react'
import SearchBar from './SearchBar'
import Filtering from './Filtering'
import { useState, useEffect } from 'react'

const SearchPage = () => {
  const[title, setTitle] = useState([])

  //Fetch api
//search bar component
//filtering component
//movie card
const onSubmit = (title) =>{
  setTitle(title)
  
}
  
  return (
    <>
    <div>SearchPage</div>
    <div><SearchBar onSubmit={onSubmit}/></div>
    <div><Filtering/></div>
  </>
  )
}

export default SearchPage