import React from 'react';
import './App.css';
import LoginPage from './Containers/LoginPage';
import PlanetList from './Containers/PlanetList';
import Planet from './Containers/Planet';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact={true} path="/" component={LoginPage} />
          <Route path="/planets" component={PlanetList} />
          <Route path="/planet/:id" component={Planet} />
        </Switch>
      </Router>
    );
  }
}

export default App;
