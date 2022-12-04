import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

import Hangman from "./Hangman";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hangman />
      </div>
    );
  }
}

export default App;
