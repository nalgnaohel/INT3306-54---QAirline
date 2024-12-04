import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopNavBar from './components/Navbar/TopNavBar';
import Login from './views/pages/Login/Login';

function App() {
  return (
    <div className="App">
      <header>
        <TopNavBar/>
      </header>
      <main>
        <Login/>
      </main>
    </div>
  );
}

export default App;
