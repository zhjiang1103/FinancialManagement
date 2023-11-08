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
  const { isAuthenticated,user } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }



 
return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />

      <div className="container flex-grow-1">
      {isAuthenticated ? (
          <>
            <span>Hello <Link to="/profile">{user.name}</Link></span>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/:id" element={<MovieDetail user={user} />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/recommendation" element={<Recommendation />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
          </>
        ) : (
          <span>Hello from Cinenova!!! Please Log in or sign up!</span>
        )}
      </div>

    </div>
  );
}

export default App;
