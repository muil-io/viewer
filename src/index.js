import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AppShell from './components/AppShell';

const App = () => (
  <Router>
    <Switch>
      <Route path="/:templateId?" component={AppShell} />
    </Switch>
  </Router>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

if (module.hot) {
  module.hot.accept(err => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
  });
}
