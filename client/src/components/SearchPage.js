import React from 'react'
import SearchBar from './SearchBar'

const SearchPage = () => {
//Fetch api
//search bar component
//filtering component
//movie card
const onSubmit = (text) =>{
  console.log(text)
}
  
  return (
    <>
    <div>SearchPage</div>
    <div><SearchBar onSubmit={onSubmit}/></div>
  </>
  )
}

export default SearchPage