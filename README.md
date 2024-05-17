# Project Name: Financial Management
Financial Manager provide a platform for you to manage your personal financial health, and helping you make informed financial decisions.

#### Part 1:
![financial1 Demo](/client/public/images/financial1.gif)
#### Part 2:
![financial2 Demo](/client/public/images/financial2.gif)
#### Part 3:
![financial3 Demo](/client/public/images/financial3.gif)

### Technologies: 

| Backend 	| Frontend 	| Database   	| Testing   	|
|---------	|----------	|------------	|-----------	|
| Node    	| Vite     	| PostgreSQL 	| RTL       	|
| Express 	| React    	| SQL        	| Vitest    	|
| Postman 	|     	    |         	    |       	    |


### Dependencies: 

| Backend      	| Frontend        	| Database 	| Testing                   	|
|--------------	|-----------------	|----------	|---------------------------	|
| cors         	| react-bootstrap 	| pg       	| @testing-library/react    	|
| dotenv       	| bootstrap       	|          	| @testing-library/jest-dom 	|
| concurrently 	| react-router-dom 	|          	| vitest-dom                	|
| nodemon      	|                 	|          	|                           	|
 
## DB SCHEMA
![schema](/client/public/images/schema.png)

## Tests Summary:
1. The `Introduction` component is tested to ensure it renders a welcome message, a platform description, and an `AuthNav` component. The tests use the `render` and `screen` utilities from `@testing-library/react` to render the component and query elements for testing. Each test asserts that the expected elements are rendered in the component, providing basic coverage for the component's rendering behavior.

2. The test suite for the `AddGoalForm` component verifies its functionality, ensuring that it correctly handles user input and triggers the handleAddGoal function with the expected values. The test suite covers the following scenarios:
Rendering: It checks if the form renders correctly with input fields for a new goal and amount, as well as an "Add Goal" button.
User Input: It simulates user input by changing the values in the goal and amount input fields.
Button Click: It clicks the "Add Goal" button to trigger the handleAddGoal function.
Function Calls: It asserts that the `handleAddGoal`, `setNewGoal`, and `setNewAmount` functions are called with the correct values when the button is clicked.



## Step-by-Step Setting up Instructions - To use this project as your starting point  🚀  
### To create the whole project


1. Go to your source directory in your terminal and run the command `https://github.com/zhjiang1103/bookManagement.git NAMENEWDIRECTORY`

2. To clean the owner git out of the main directory, run the command `rm -rf .git`

3. Run the command `git init` to start your own git track 

4. Go to the server folder in the project (`cd server`) and run the command `npm install`

5. Inside your server folder, open the file `.env.example` and copy the correct option for your configuration found there to your new .env file. 

Here is what your `.env` might look like:

```
DATABASE_URL="postgresql://user:password@localhost/database"
openai_key = "...."
MovieDB_API_KEY = "..."

//Config values for Auth0 - 
SECRET=""
BASEURL="http://localhost:3000"
CLIENTID=""
ISSUER=""

//change from DB_URI to DATABASE_URL
``` 

6. Go to the client folder in the project (`cd .. and cd client`) and run the command `npm install --save --legacy-peer-deps`

🔎 The `npm install` command installs the required dependencies defined in the package.json files and generates a node_modules folder with the installed modules.

7. If you want to run both servers concurrently (which is already a npm dependency on the server) you can keep the script in the package.json in the server that reads `"dev": " concurrently 'npm start' 'cd .. && cd client && npm run dev' "`. If you run the command `npm run dev` from within your server, both the client and backend servers will start.

10. Go to localhost:3000  💪

⚡ **Notes** ⚡  
* React requires **Node >= 14.0.0** & **npm >= 5.6**
* Please note that your backend server will run from `port 8080`, and your frontend React server will run from `port 3000`.

⚙️ Links that you could need:

* The instructions for [pg](https://node-postgres.com/apis/pool)  
* Setup [postgres correctly](https://github.com/Techtonica/curriculum/blob/main/databases/installing-postgresql.md)


