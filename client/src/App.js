import "./App.css";
import NavBar from "./components/nav-bar";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import Recommendation from "./components/RecomPage/Recommendation";
import MovieDetail from "./components/MovieDetail";
import Profile from "./components/ProfilePage/profile";
import { useState} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/loading";
import { Route, Routes, Link } from 'react-router-dom';



function App() {
 

  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  // useEffect(() => {
  //   const handleUserPost = (data) => {
  //     //console.log("Inside the App", data);
  //   fetch("http://localhost:8080/api/users", {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data)
  //   })
  //   .then((reponse) => reponse.json())
  //   .then((result) => {
  //     console.log("Inside the post line 32", result)
  //     setUsers([...users, result])
  //   })
  // }
    
  //   handleUserPost(user); // Call the function


  // }, []); 
  


 
return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />

      <div className="container flex-grow-1">
        {!user ? <span>Hello from Cinenova!!!</span> : <span>Hello <Link to="profile">{user.name}</Link></span>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MovieDetail user={user}/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/profile" element={<Profile user={user} />} />
          {/* <Route path="api/me" element={<Profile user={user}/>} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
