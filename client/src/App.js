import React from 'react';
import './App.css';
import Login from './components/login'
import { Router, NavLink } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header>
        <NavLink to ="/">Home</NavLink>
        <NavLink to ="/">Home</NavLink>
        <NavLink to ="/">Home</NavLink>
      </header>
      <Route path="/login" component={login}></Route>
     
     
    </div>
  );
}

export default App;
