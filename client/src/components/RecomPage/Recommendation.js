import { useState, useEffect } from 'react'
import RecomForm from './RecomForm'
import axios from 'axios';
import MovieCard from '../MovieCard';

const Recommendation = () => {
  

  const [RecomData, setRecomData] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGPTBackend = (userPurpose) =>{
    setPurpose(userPurpose)
    const url = `http://localhost:8080/recommendations?purpose=${purpose}`;
    axios.get(url)
      //.then((response) => console.log(response.data))
      .then((response) => {
        setRecomData(response.data);
        setIsLoading(false);
     // Data is fetched, set isLoading to false
      }) 
      .catch((error) => console.error('Error fetching data:', error));
  }
  // useEffect(() => {
  //   if (purpose) {
  //     fetchGPTBackend(purpose);
  //   }
  // }, [purpose]);
  
const onSubmit=(purpose)=>{
  setIsLoading(true);
  if (purpose) {
    fetchGPTBackend(purpose);
  }
}

  return (
    <><div>
      <RecomForm onSubmit={onSubmit} />
    </div><div>
        {isLoading ? ( // Conditionally render loading gif or recommendation list
         <img src = "https://cdn.dribbble.com/users/530580/screenshots/4712372/loader.gif" alt = "Loading gif"></img>
      
        ) : (

          <><ul>
            <div className="movie-list">
              {RecomData.map((movie) => (
                <div className="movie-card">
                  <li key={movie.results[0].id}><MovieCard movie={movie.results[0]} /></li>
                </div>
              ))}
            </div>
          </ul></>

        )}
      </div></>
   
  );
          };




export default Recommendation