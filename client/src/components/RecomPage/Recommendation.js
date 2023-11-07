import { useState, useEffect } from 'react'
import RecomForm from './RecomForm'
import axios from 'axios';
import MovieCard from '../MovieCard';

const Recommendation = () => {

  const [RecomData, setRecomData] = useState([]);
  const [purpose, setPurpose] = useState([]);

  const fetchGPTBackend = (purpose) =>{
    setPurpose(purpose)
    const url = `http://localhost:8080/recommendations?purpose=${purpose}`;
    axios.get(url)
      //.then((response) => console.log(response.data))
      .then((response) => setRecomData(response.data))

      .catch((error) => console.error('Error fetching data:', error));
  }
  useEffect(() => {
    fetchGPTBackend();
  }, [purpose]);

const onSubmit=(purpose)=>{
  fetchGPTBackend(purpose)
}

  return (
    <div>
      <div>
        <RecomForm onSubmit={onSubmit}/>
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