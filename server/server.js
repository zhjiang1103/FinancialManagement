const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const OpenAI = require('openai');
const fetch = require('node-fetch');



const app = express();
///Users/cristina/src/2022H2TemplateFinal/client/build
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  //res.json({ message: 'Hello from My template ExpressJS' });
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

//Create post request to connect to DB
app.post('/api/users', cors(), async (req, res) => {
const newUser = {
lastname: req.body.lastname,
firstname: req.body.firstname,
email: req.body.email,
};
console.log([newUser.lastname, newUser.firstname, newUser.email]);
const result = await db.query(
'INSERT INTO users(lastname, firstname, email) VALUES($1, $2, $3) RETURNING *',
[newUser.firstname, newUser.lastname, newUser.email],
);
console.log(result.rows[0]);
res.json(result.rows[0]);
});

//Get recommendation using openAI API
const openai = new OpenAI({ apiKey: process.env.openai_key });
const getChat = async function (req, res, next) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Please provide 5 recommendated movies as a JSON string that starts with [, and ends with ], representing an array of objects. Each recommendation object should have three properties: name, year, summary. The recommendation is for someone who is age 40 and likes action movies. " }],
    model: "gpt-3.5-turbo",
  });
  const content = JSON.parse(completion.choices[0].message.content);
  req["ChatGptResult"] = content;

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

app.get('/recommendations', [getChat,  getMovieInfo]);


//function to do fetching
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







// // create the POST request
// app.post('/api/students', cors(), async (req, res) => {
// const newUser = {
// firstname: req.body.firstname,
// lastname: req.body.lastname,
// };
// console.log([newUser.firstname, newUser.lastname]);
// const result = await db.query(
// 'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
// [newUser.firstname, newUser.lastname],
// );
// console.log(result.rows[0]);
// res.json(result.rows[0]);
// });

// //A put request - Update a student 
// app.put('/api/students/:studentId', cors(), async (req, res) =>{
// console.log(req.params);
// //This will be the id that I want to find in the DB - the student to be updated
// const studentId = req.params.studentId
// const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname}
// console.log("In the server from the url - the student id", studentId);
// console.log("In the server, from the react - the student to be edited", updatedStudent);
// // UPDATE students SET lastname = "something" WHERE id="16";
// const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id=${studentId} RETURNING *`;
// const values = [updatedStudent.lastname, updatedStudent.firstname];
// try {
// const updated = await db.query(query, values);
// console.log(updated.rows[0]);
// res.send(updated.rows[0]);

// }catch(e){
// console.log(e);
// return res.status(400).json({e})
// }
// })

// // delete request
// app.delete('/api/students/:studentId', cors(), async (req, res) =>{
// const studentId = req.params.studentId;
// //console.log("From the delete request-url", req.params);
// await db.query('DELETE FROM students WHERE id=$1', [studentId]);
// res.status(200).end();

// });


// // create the POST request for a new user
// // CREATE TABLE users (
// // 	ID SERIAL PRIMARY KEY,
// // 	lastname varchar(255),
// // 	firstname varchar(255),
// //     email varchar(255), 
// //     sub varchar(255));
// app.post('/api/me', cors(), async (req, res) => {
//   const newUser = {
//     lastname: req.body.family_name,
//     firstname: req.body.given_name,
//     email: req.body.email,
//     sub: req.body.sub

//   }
//   //console.log(newUser);

//   const queryEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1';
//   const valuesEmail = [newUser.email]
//   const resultsEmail = await db.query(queryEmail, valuesEmail);
//   if(resultsEmail.rows[0]){
//     console.log(`Thank you ${resultsEmail.rows[0].firstname} for comming back`)
//   } else{
//   const query = 'INSERT INTO users(lastname, firstname, email, sub) VALUES($1, $2, $3, $4) RETURNING *'
//   const values = [newUser.lastname, newUser.firstname, newUser.email, newUser.sub]
//   const result = await db.query(query, values);
//   console.log(result.rows[0]);

//   }

// });



// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
