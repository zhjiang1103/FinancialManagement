import React from 'react'
import Card from 'react-bootstrap/Card';
import SelectStatus from '../components/SelectStatus';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import {MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { fetchByID,fetchFavDB,fetchFavPost, fetchFavDelete } from '../API';



const MovieDetail = () => {
  const { isAuthenticated,user } = useAuth0();
  //get user email from props passed from parent component
  const { id } = useParams();
  const [book, setBook] = useState([]);
  // const [actions, setActions] = useState([])
  const [isFav, setIsFav] = useState('false')
  const [statusCode, setStatusCode] = useState(0)
  const [status, setStatus] = useState('available')
  
 

  //Get specific book info
  async function getBookById() {
    try {

        const response = await fetchByID(id)
        const theBook = response.data;
        console.log(theBook)
        setBook(theBook)

    } catch (error) {
        console.log(error.message);
    }
}

useEffect(() => {
    getBookById();
}, []);

 

async function sendStatusInfo(email, api_id, shelf_status) {

  const response = await fetch('/api/feed', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, api_id, shelf_status })
  });

  return await response.json();
}

// sends favorite action info to the feed table
async function sendFavoriteInfo(email, api_id, isFav) {

  const response = await fetch('/api/feed', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, api_id, isFav  })
  });

  return await response.json();
}


//gets all infos
async function getUserAllActionsforbook(email, api_id) {

  try {
    const response = await fetch(`/api/feed/${email}/${api_id}`);

    const actions = await response.json();
    console.log(actions)
    // setActions(actions)
    setIsFav(actions[0].isfavorite)
    setStatusCode(actions[0].shelf_status)
    switch (actions[0].shelf_status) {

            case 0:
                setStatus('available')
            break;
      
            case 1:
              setStatus('reserved')
            break;
      
            case 2:
              setStatus('checked-out');
            break;
      
            default:
        }
    console.log(actions[0].isfavorite);

  } catch (error) {
    console.log(error.message)
  }
}

useEffect(() => {
  if(isAuthenticated) {
    getUserAllActionsforbook(user.email, id);
  }
}, [isAuthenticated]); 



// changes isFaved state
function handleFavories () {

  const newStatus = !isFav; //setIsFaved is an asycn ()
  console.log("click1", newStatus)
  setIsFav(newStatus)
  
  // sendFavoriteInfo(user.email, id, newStatus)
}

// // turns updates the UI accordingly
// useEffect(() => {
//   setIsFav(actions.isfavorite);
// }, [actions]);

function handleSelect (event) {

  const value = event.target.value;
  setStatus(value) 
  switch (value) {

      case 'available':
          setStatusCode(0)
      break;

      case 'reserved':
        setStatusCode(1)
      break;

      case 'checked-out':
        setStatusCode(2)
      break;

      default:
  }
  console.log(status)
  console.log(statusCode)
  sendStatusInfo(user.email, id, statusCode)
}

useEffect(() => {
  console.log("Updated status:", status);
  console.log("Updated statusCode:", statusCode);
  sendStatusInfo(user.email, id, statusCode);
}, [status, statusCode]);

useEffect(() => {
  console.log('updated', isFav)
  sendFavoriteInfo(user.email, id, isFav)
}, [isFav]);




const iconProps = {
  size: 32,
  style: {
    color: 'red',
  },
  onClick: handleFavories,
};

function removeHtmlTags(str) {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, '');
}


  // if(!componentHasFetchedData) {
  //   return (<div> Loading ... </div>)
  // }

  return (
    <>
      <div className='movieDetail'>
        <Card >
          <Card.Body >
            <Card.Img variant="top" src={book?.volumeInfo?.imageLinks?.thumbnail || ""} style={{width: '50%'}} />
            <div style={{ display: "flex", paddingLeft: '10px' }}>
              <Card.Title>{book?.volumeInfo?.title || ""}</Card.Title>
            </div>
            <Card.Text>
              <div>
                <span><strong>Book Description: </strong></span>
                <div className="new-line-description">{removeHtmlTags(book?.volumeInfo?.description)}</div>
              </div>
              <div className="movie-category">
              <span className="category-label"><strong>Categories:</strong></span>
              <div className="new-line-description">{book?.volumeInfo?.categories}</div>
              <div>

                {
                    isAuthenticated && 
                    (
                      isFav
                ? <MdFavorite className="favorite-icon" {...iconProps} />
                : <MdFavoriteBorder className="favorite-icon" {...iconProps} />
                    )
                }

            </div>
            
            <SelectStatus value = {status} onChange = {handleSelect}/>
            </div>
            
            </Card.Text>

          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default MovieDetail