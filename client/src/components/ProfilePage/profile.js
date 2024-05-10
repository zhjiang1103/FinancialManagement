import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "react-bootstrap"
import MovieCard from '../MovieCard';
import { fetchByID } from '../../API';
//import SelectStatus from '../components/SelectStatus';

const Profile = () => {
  const { isAuthenticated, user } = useAuth0();
  const [allActions, setAllActions] = useState([])
  const [books, setBooks] = useState([])

  //gets all infos
  async function getUserAllActions(email) {

    try {
      const response = await fetch(`/api/profile/${email}`);

      const allActions = await response.json();
      setAllActions(allActions);
      console.log(allActions)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
      getUserAllActions(user.email);
    }
  }, [isAuthenticated, user]); 

  
  async function getBookById() {
    try {
      let bookResults = []
      for (let book of allActions){
        const response = await fetchByID(book.api_id)
        const bookInfo = response.data;
        bookResults.push(bookInfo)
      }
    
        setBooks(bookResults)
        console.log(books)

    } catch (error) {
        console.log(error.message);
    }
}

useEffect(() => {
    getBookById();
}, [allActions]);


const handleSortClick = () => {
  const sorted = [...books].sort((a, b) =>
    a.volumeInfo.title.localeCompare(b.volumeInfo.title)
  );
  setBooks(sorted);
};


  return (
    <div>
      <div className="row align-items-center profile-header">
        <div className="col-md text-center text-md-left">
          <h2>My Books</h2>
        </div>
      </div>
      <img src="https://cdn-icons-png.flaticon.com/128/2102/2102633.png"
        alt="Profile"
        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
      />
      
     
       


      <button className="btn btn-primary" onClick={handleSortClick}>
          Sort by Title
      </button>
      
         
      <ul>
        <div className="movie-list">
        {books.map((book, index) => (
            <div className="movie-card">
            
              <li><MovieCard key={index}
                             img = {book.volumeInfo.imageLinks?.thumbnail}
                             id = {book?.id} /></li>
                             
            </div>
        ))}
        
        </div>
      </ul>
      
   
    </div>



  );
};

export default Profile;