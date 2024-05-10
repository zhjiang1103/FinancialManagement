const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
// const OpenAI = require('openai');
const fetch = require('node-fetch');
//const { fetchByID } = require('../client/src/API.js');



const app = express();
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Cinenova' });
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});



//Create post request to connect to DB, adding new user
app.post('/api/users', cors(), async (req, res) => {
  const newUser = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
  };
  console.log([newUser.lastname, newUser.firstname, newUser.email]);
  // Check if the email already exists in the database
  const emailCheck = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [newUser.email]
  );

  if (emailCheck.rows.length > 0) {
    // Email already exists, you can send a response or handle it as needed
    console.log(`Thank you ${emailCheck.rows[0].firstname} for comming back`)
    res.status(409).json({ error: 'Email already exists' });
  } else {
    // Email is unique, proceed with the insertion
    const result = await db.query(
      'INSERT INTO users(lastname, firstname, email) VALUES($1, $2, $3) RETURNING *',
      [newUser.lastname, newUser.firstname, newUser.email]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  }
});

//Fetch books
app.get("/api/books", async (req, res) =>  {
    
  try {
      const urls = [
          'https://www.googleapis.com/books/v1/volumes?q=subject:science+fiction&startIndex=3&maxResults=12',
          'https://www.googleapis.com/books/v1/volumes?q=subject:cookbooks&maxResults=8',
          'https://www.googleapis.com/books/v1/volumes?q=subject:manga&maxResults=8',
          'https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=8'
      ];

      const fetchBookData = async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          return data.items || [];
      };

      const allBookRequests = urls.map(url => fetchBookData(url));
      const allBooksResults = await Promise.all(allBookRequests);

      const demo_books = allBooksResults.flat();
      res.status(200).json(demo_books);

  } catch (error) {
      console.error("Error Message!:", error.message);
      res.status(500).json({ message: error.message });
  }

});


// //finds the user id based on the email
async function getUserIdFromEmail(email) {

  const user = await db.query(
      'SELECT user_id FROM users WHERE email = $1',
       [email]
  );
  
  return user.rows[0].user_id;
}


// //update and add feed events
app.post("/api/feed", async (req, res) =>  {
    
  try {
      
      let {email, api_id, isFav, shelf_status } = req.body;

      let user_id = await getUserIdFromEmail(email)

      const existingEntry = await db.query("SELECT * FROM feeds WHERE api_id = $1 AND user_id = $2", [api_id, user_id]);

      if (existingEntry.rows.length > 0) {

          if (shelf_status === undefined) {
              shelf_status = existingEntry.rows[0].shelf_status;
          }

          const updatedBook = await db.query(
              "UPDATE feeds SET isFavorite = $1, shelf_status = $2 WHERE api_id = $3 AND user_id = $4 RETURNING *",
              [isFav, shelf_status, api_id, user_id]
          );
          
          res.status(200).json(updatedBook.rows[0]);
      }
      else {
          const newItem = await db.query(
              "INSERT INTO feeds (api_id, user_id, isfavorite, shelf_status) VALUES ($1, $2, $3, $4) RETURNING *", [api_id, user_id, isFav, shelf_status]
          );

          // Send back the new feed entry with a 201 Created status
          res.status(201).json(newItem.rows[0]);
      }

  } catch (error) {
      console.error("Error Message!:", error.message);
      res.status(500).json({ message: error.message });
  }

});

//gets all info about user's actions
app.get("/api/profile/:email", async (req, res) =>  {
    
  try {
      const { email } = req.params;
      let loggedInUserId = await getUserIdFromEmail(email)
      
      const {rows : user_actions} = await db.query(`
          SELECT u.user_id, f.*
          FROM feeds f
          JOIN users u ON f.user_id = u.user_id
          WHERE u.user_id = $1`, [loggedInUserId]
      );

      if (user_actions.length === 0) {
          res.status(200).json([]); 
      } 
      else {
          res.status(200).json(user_actions);
      }
      
  } catch (error) {
      console.error("Error Message!:", error.message);
      res.status(500).json({ message: error.message });
  }

});

//queries for the user's action
app.get("/api/feed/:email/:apiId", async (req, res) =>  {
    
  try {
      const { email, apiId } = req.params;

      let user_id = await getUserIdFromEmail(email)
      const {rows : user_action} = await db.query('SELECT * FROM feeds WHERE user_id = $1 AND api_id = $2', [user_id, apiId]);
  
      if (user_action.length === 0) {
          
          res.status(404).json({ message: "User action not found" });
      } else {
          res.status(200).json(user_action);
      }
      
  } catch (error) {
      console.error("Error Message!:", error.message);
      res.status(500).json({ message: error.message });
  }

});

app.get('/api/books/my', async (req, res) =>{

  //real connection with the DB eventonica
  try{
      const { rows: books } = await db.query('SELECT * FROM books');
      res.send(books);
  } catch(error){
      console.log(error);
      return res.status(400).json({error});

  }

})


app.delete('/api/books/my/:id', async (req, res) =>{
  try{
  const bookId = req.params.id;
  const deleteOperation = await db.query("DELETE FROM books WHERE id=$1", [bookId]);
  res.status(200).end()
  console.log(deleteOperation);
  } catch(error){
      console.log(error);
      res.status(400).json({error});
  }
})

app.put('/api/books/my/:id', async (req, res) =>{
  try{
      const bookId = req.params.id;
      const { category } = req.body; 
      const updateOperation = await db.query("UPDATE books SET category=$1 WHERE id=$2", [category, bookId]);
      console.log(updateOperation);
      res.status(200).end()
  
      } catch(error){
          console.log(error);
          res.status(400).json({error});
      }
})

app.post('/api/books/my', async (req, res) =>{
  try {
     
      const { title, author, img_url, category } = req.body;
  
      const result = await db.query(
      "INSERT INTO books (title, author, img_url, category) VALUES ($1, $2, $3, $4) RETURNING *",
          [title, author, img_url, category]
      );
      let dbResponse = result.rows[0];
      console.log("db", dbResponse)
      res.json(dbResponse);
  } catch(error){
      console.log(error);
      res.status(400).json({error});
  }
})

function isAdmin(email) {
  return email === 'janetjiang1103@gmail.com'; 
}

function authorize(req, res, next) {
  if (!isAdmin(req.user.email)) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
}

app.get('/api/users', authorize, async (req, res) => {
  try {
    const { rows: users } = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
