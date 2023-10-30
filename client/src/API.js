import axios from 'axios'

export function fetchPopular() {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';


    const apiKey = process.env.REACT_APP_API_KEY
    
    return axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: 'application/json',
        }
    })

}

