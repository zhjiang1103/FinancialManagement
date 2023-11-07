import React, { useState } from 'react';
import MovieCard from '../MovieCard';
import { fetchFavList } from '../../API';


const Profile = (props) => {
  let user = props.user;
  //console.log("user2",user);
  const [favMovie, setFavMovie] = useState()


  const handleFavoriteClick = async () => {
    try {
      const response = await fetchFavList(user.email)

      const formattedMovie = response.data;
      console.log("response", response.data)
      setFavMovie(formattedMovie);
      console.log(formattedMovie); // Log the formatted movies

    } catch (error) {
      console.error('Error fetching Fav movies:', error);
    }
  };


  return (
    <div>
      <div className="row align-items-center profile-header">
        <div className="col-md text-center text-md-left">
          <h2>{user.given_name}</h2>
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{user.family_name}</h2>
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{user.email}</h2>
        </div>
      </div>
      <img src="https://cdn-icons-png.flaticon.com/128/2102/2102633.png"
        alt="Profile"
        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
      />
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div>
        <button onClick={handleFavoriteClick}>Your Favorited Movie List</button>



      </div>
      {favMovie && favMovie.length > 0 && ( // Check if favMovie exists and has items
        <div>
         
         <ul>
        <div className="movie-list">
          {favMovie.map(movie => (
            <div className="movie-card">
              <li key={movie.id}><MovieCard movie={movie}/></li>
            </div>
          ))}
        </div>
      </ul>
        </div>
      )}
    </div>



  );
};

export default Profile;