import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import PartyActivityFinder from './PartyActivityFinder';
import PartyGenerator from './PartyGenerator';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Party App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/partyactivityfinder">Party Activity Finder</Link>
            </li>
            <li>
              <Link to="/partygenerator">Party Generator</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partyactivityfinder" element={<PartyActivityFinder />} />
          <Route path="/partygenerator" element={<PartyGenerator />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return <h2>Welcome to the Home Page!</h2>;
};

export default App;
