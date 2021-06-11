import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import './App.css';
// Adding browser router controls
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
