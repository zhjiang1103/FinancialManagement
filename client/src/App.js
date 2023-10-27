import "./App.css";
import NavBar from "./components/nav-bar";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import Recommendation from "./components/RecomPage/Recommendation";
import ProfilePage from "./components/ProfilePage/ProfilePage";
//import Profile from "./components/profile";

import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/loading";
import { Route, Routes, Link } from 'react-router-dom';


function App() {

  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
     
      <div className="container flex-grow-1">
      {!user ? <span>Hello from Techtonica From DEV!!!</span> : <span>Hello <Link to="api/me">{user.name}</Link></span> }
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/recommendation" element={<Recommendation />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/* <Route path="api/me" element={<Profile user={user}/>} /> */}
      </Routes>
      </div>
    </div>
  );
}

export default App;
