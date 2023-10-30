import axios from 'axios'

//fetching popular movies from Movie API 
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

//Search for movies by their original, translated and alternative titles.
export function fetchByTitle(title){
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
    const apiKey = process.env.REACT_APP_API_KEY
    
    return axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: 'application/json',
        }
    })
}

