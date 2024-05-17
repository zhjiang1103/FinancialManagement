import "./App.css";
import Introduction from "./components/Introduction";
import NavBar from "./components/nav-bar";
import GoalPage from "./components/GoalPage/GoalPage";
import TransactionsPage from "./components/TransactionsPage/TransactionsPage";
import { useState} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/loading";
import { Route, Routes } from 'react-router-dom';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import ReportPage from "./components/ReportPage/ReportPage";





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
              <Route path="/" element={<GoalPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/report" element={<ReportPage user={user} />} />
            </Routes>
          </>
        ) : (
          <Introduction />
        )}
      </div>
   
    </div>
 
  );
}

export default App;
