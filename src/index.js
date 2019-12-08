import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Landing from './components/landing';
import './assets/styles/app.css';

class App extends Component {
  render() {
    return (
      <div>
        <Landing/>
      </div> 
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
