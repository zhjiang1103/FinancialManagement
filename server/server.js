const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
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
  res.json({ message: 'Hello' });
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


// //finds the user id based on the email
async function getUserIdFromEmail(email) {

  const user = await db.query(
      'SELECT user_id FROM users WHERE email = $1',
       [email]
  );
  
  return user.rows[0].user_id;
}


// add transactions
app.post("/api/transactions", async (req, res) =>  {
    
  try {
      
      let {email, type, amount, month, year } = req.body;

      let user_id = await getUserIdFromEmail(email)

      const result = await db.query(
        "INSERT INTO transactions (user_id, type, amount, month, year) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user_id, type, amount, month, year]
        );
        let dbResponse = result.rows[0];
        console.log("db", dbResponse)
        res.json(dbResponse);
    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }

});

app.get('/api/transactions/:email', async (req, res) =>{
  const { email } = req.params;
    let loggedInUserId = await getUserIdFromEmail(email)
  
    try{
      const { rows: transactions } = await db.query('SELECT * FROM transactions WHERE user_id = $1', [loggedInUserId]);
      res.send(transactions);
  } catch(error){
      console.log(error);
      return res.status(400).json({error});

  }

})


app.delete('/api/transactions/:id', async (req, res) =>{
  try{
      const transactionId = req.params.id;
      const deleteOperation = await db.query("DELETE FROM transactions WHERE transaction_id=$1", [transactionId]);
      res.status(200).end()
      console.log(deleteOperation);
  } catch(error){
      console.log(error);
      res.status(400).json({error});
  }
})

app.put('/api/transactions/:id', async (req, res) =>{
  try{
      const { id } = req.params;
      const {email, type, amount, month, year } = req.body; 
      let user_id = await getUserIdFromEmail(email)
      // Update the transaction
      const result = await db.query(
        'UPDATE transactions SET type = $1, amount = $2, month = $3, year = $4, user_id = $5 WHERE transaction_id = $6 RETURNING *', 
        [type, amount, month, year, user_id, id]);
      const updatedTransaction = result.rows[0];

      res.json(updatedTransaction);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
})


app.get('/api/goal/:email', async (req, res) =>{
  const { email } = req.params;
    let loggedInUserId = await getUserIdFromEmail(email)
  //real connection with the DB finance
  try{
      const { rows: goal } = await db.query('SELECT * FROM goal WHERE user_id = $1', [loggedInUserId]);
      res.send(goal);
  } catch(error){
      console.log(error);
      return res.status(400).json({error});

  }

})

app.put('/api/goal/my', async (req, res) =>{
  try{
      const {email, goal, amount } = req.body; 
      let user_id = await getUserIdFromEmail(email)
      // Update the goal
      const result = await db.query('UPDATE goal SET goal = $1, amount = $2 WHERE user_id = $3 RETURNING *', [goal, amount, user_id]);
      const updatedGoal = result.rows[0];

      res.json(updatedGoal);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
})

app.post('/api/goal/my', async (req, res) =>{
  try {
     
      const { email, goal, amount } = req.body;
      let user_id = await getUserIdFromEmail(email)
      const result = await db.query(
      "INSERT INTO goal (user_id, goal, amount) VALUES ($1, $2, $3) RETURNING *",
          [user_id, goal, amount]
      );
      let dbResponse = result.rows[0];
      console.log("db", dbResponse)
      res.json(dbResponse);
  } catch(error){
      console.log(error);
      res.status(400).json({error});
  }
})



// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
