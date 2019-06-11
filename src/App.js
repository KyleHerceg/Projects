import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import NavBar from './Navbar';
import EmployeeList from './EmployeeList';


function App() {
  return (
    <div className="App">

      <header className="App-header">

        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
        <NavBar/>    
    
      </header>

      <Router>
       <Route path="/permissions" component={EmployeeList}/>
      </Router>

    </div>
  );
}

export default App;
