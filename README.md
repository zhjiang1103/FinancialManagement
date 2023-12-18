# Project Name: CineNova
CineNova is a user-centric movie companion web application that streamlines entertainment decisions by providing personalized recommendations, ensuring an effortless and tailored experience for every user's unique purpose of watching movies.


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
 

1. Trello: https://trello.com/b/TMAKO7Or/film-recommendation-app
2. Project pitch: https://zhjiang1103.bit.ai/docs/view/FZdUAI2gtU2G4qES

## Nice-to-have/secondary or stretch goals: 
1. Near-By Page: Finding nearby movies in theaters on a map
2. Community and social feature: Discussion and groups

## Step-by-Step Setting up Instructions - To use this project as your starting point  🚀  
### To create the whole project


1. Go to your source directory in your terminal and run the command `https://github.com/zhjiang1103/finalproject.git NAMENEWDIRECTORY`

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

10. Go to localhost:3000 and you should see something like this  💪

![You will something like this in your terminal.](https://d2j4gdpjmxjmy3.cloudfront.net/v2/147471/contents/evmDhgkElJjrKFRp/mw1920_Screen_Shot_2023-10-23_at_11.20.51_AM.png)

⚡ **Notes** ⚡  
* React requires **Node >= 14.0.0** & **npm >= 5.6**
* Please note that your backend server will run from `port 8080`, and your frontend React server will run from `port 3000`.

⚙️ Links that you could need:

* The instructions for [pg](https://node-postgres.com/apis/pool)  
* Setup [postgres correctly](https://github.com/Techtonica/curriculum/blob/main/databases/installing-postgresql.md)


