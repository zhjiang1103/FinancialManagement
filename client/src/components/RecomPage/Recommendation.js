import { useState, useEffect } from 'react'
import RecomForm from './RecomForm'
import axios from 'axios';

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
        {RecomData.map((item) => (
          <li key={item.results[0].id}>{item.results[0].original_title}</li>
        ))}
      </ul>
    </div>
  );
};



export default Recommendation