import { useState, useEffect } from 'react'
import RecomForm from './RecomForm'
import axios from 'axios';
import MovieCard from '../MovieCard';

const Recommendation = () => {

  const [RecomData, setRecomData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/recommendations")
      //.then((response) => console.log(response.data))
      .then((response) => setRecomData(response.data))

      .catch((error) => console.error('Error fetching data:', error));
  }, []);



  return (
    <div>
      <div>
        <RecomForm />
      </div>

      <h1>Recommendated Movie List</h1>
      <ul>
        <div className="movie-list">
          {RecomData.map((movie) => (
             <div className="movie-card">
            <li key={movie.results[0].id}><MovieCard movie={movie.results[0]} /></li>
            </div>
          ))}
        </div>
      </ul>

    </div>
  );
};



export default Recommendation