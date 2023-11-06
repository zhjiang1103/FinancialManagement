import axios from 'axios'

const backend = process.env.REACT_APP_BACKEND

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

//Search for movies by their original, translated and alternative titles.
export function fetchByPerson(person){
    const apiUrl = `https://api.themoviedb.org/3/search/person?query=${person}&include_adult=false&language=en-US&page=1`;
    const apiKey = process.env.REACT_APP_API_KEY
    
    return axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: 'application/json',
        }
    })
}

export function fetchByID(ID){
    const apiUrl = `https://api.themoviedb.org/3/movie/${ID}?language=en-US`;
    const apiKey = process.env.REACT_APP_API_KEY
    
    return axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: 'application/json',
        }
    })
}

export function fetchFavDB(user_email, movie_id){
   
    const apiUrl = `${backend}/api/fav`;
    return axios.get(apiUrl, {params: {user_email,movie_id}})
}

export function fetchFavByEmail(user_email){
    const apiUrl = `${backend}/api/fav/${user_email}`;
    return axios.get(apiUrl, {params: {user_email}})
}

export function fetchFavPost(user_email, movie_id){
    const apiUrl = `${backend}/api/fav`;
    return axios.post(apiUrl, {user_email,movie_id})
}

export function fetchFavDelete(user_email, movie_id){
    const apiUrl = `${backend}/api/fav`;
    return axios.delete(apiUrl, {params: {user_email,movie_id}})
}
