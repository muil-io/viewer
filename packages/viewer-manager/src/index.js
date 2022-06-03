import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './style/global';
import AppShell from './components/AppShell';
import theme from './style/theme';
import './style/fonts.css';

const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/:templateId?" component={AppShell} />
        </Switch>
      </Router>
    </ThemeProvider>
  </>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
  });
}
