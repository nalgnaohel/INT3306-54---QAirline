import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopNavBar from './components/Navbar/TopNavBar';
import Login from './views/pages/Login/Login';
import Home from './views/pages/Home/Home';
import Admin from './Admin';

function App() {
  return (
    <div className="App">
      <Admin />
    </div>
  );
}

export default App;
