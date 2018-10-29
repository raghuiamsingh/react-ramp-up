import React from 'react';
import './Styles/index.scss';
import LoginPage from './Containers/LoginPage';
import PlanetList from './Containers/PlanetList';
import Planet from './Containers/Planet';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from './reducers';

class App extends React.Component {
  render() {
    const store = createStore(reducers.planetReducer);

    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact={true} path="/" component={LoginPage} />
            <Route path="/planets" component={PlanetList} />
            <Route path="/planet/:id" component={Planet} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
