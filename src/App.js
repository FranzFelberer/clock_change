import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SunTimesChart from './sunTimesChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SunTimesChart />
      </div>
    );
  }
}

export default App;
