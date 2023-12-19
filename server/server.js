const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const OpenAI = require('openai');
const fetch = require('node-fetch');



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

// create the get request to connect to DB
app.get('/api/movies', async (req, res) => {
  try {
    // const { rows: contact } = await db.query('SELECT * FROM contact');
    const { rows: movie } = await db.query('SELECT * FROM movies');
    res.send(movie);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ e });
  }
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

//Create post request to connect to DB, adding new fav
app.post('/api/fav', cors(), async (req, res) => {
  console.log(req.body)

  //console.log([req.body.email, req.body.api_id]);

  const result = await db.query(
    'INSERT INTO fav (user_email, movie_id) VALUES($1, $2) RETURNING *',
    [req.body.user_email, req.body.movie_id]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
}
);

app.delete('/api/fav', cors(), async (req, res) => {

  await db.query('DELETE FROM fav WHERE user_email = $1 and movie_id = $2', [req.query.user_email, req.query.movie_id]);
  res.status(200).end();
})

app.get('/api/fav', async (req, res) => {
  const favCheck = await db.query(
    'SELECT * FROM fav WHERE user_email = $1 and movie_id = $2',
    [req.query.user_email, req.query.movie_id]
  );


  if (favCheck.rows.length > 0) {
    // fav already exists, you can send a response or handle it as needed
    res.json({ isFav: true })

  } else {
    res.json({ isFav: false })
  }
})

// create the get request to fetch user's fav movies
app.get('/api/fav/:user_email', async (req, res) => {
  try {
    const user_email = req.params.user_email; // Get user_email from the query parameter
    const { rows: movieIds } = await db.query('SELECT movie_id FROM fav WHERE user_email = $1', [user_email]);
    let movieResults = []
    for (let movieObject of movieIds) {
      let movieInfo = await fetchByID(movieObject.movie_id);
      movieResults.push(movieInfo)
    }
    res.send(movieResults);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ e });
  }
});

//Get recommendation using openAI API
const openai = new OpenAI({ apiKey: process.env.openai_key });

const getChat = async function (req, res, next) {
  console.log("start", new Date())
  const purpose = req.query.purpose; // Adjust this based on your client request structure
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Please provide 10 unique recommended movies as a JSON string that starts with [, and ends with ], representing an array of objects. Each recommendation object should have three properties: name, year, summary. The recommendation is for someone whose purpose of watching movie is ${purpose}.`  }],
    model: "gpt-3.5-turbo",
  });

  const content = JSON.parse(completion.choices[0].message.content);
  req["ChatGptResult"] = content;
  console.log("end", new Date())

  //console.log('CB0');
  next();
}

//Using the result from chatGPT to fetch movie details from movie DB API
const getMovieInfo = async function (req, res) {
  const content = req["ChatGptResult"]
  let movieDBResults = []
  for (let recommendation of content) {
    let movieInfo = await fetchDB(recommendation);
    movieDBResults.push(movieInfo)
  }
  res.send(movieDBResults);
}

app.get('/recommendations', [getChat, getMovieInfo]);


//function to do fetching by name
const fetchDB = async (recommendation) => {
  const apiKey = process.env.MovieDB_API_KEY
  const url = `https://api.themoviedb.org/3/search/movie?query=${recommendation.name}&include_adult=false&language=en-US&primary_release_year=${recommendation.year}&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }
  };

  const json = await fetch(url, options)
    .then(res => res.json())
    //.then(json => json)
    .catch(err => console.error('error:' + err));
  return json

}

//function to do fetching by ID
const fetchByID = async (id) => {
  const apiKey = process.env.MovieDB_API_KEY
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }
  };

  const json = await fetch(url, options)
    .then(res => res.json())
    //.then(json => json)
    .catch(err => console.error('error:' + err));
  return json

}









// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
