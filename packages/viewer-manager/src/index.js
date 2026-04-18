import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './style/global';
import AppShell from './components/AppShell';
import theme from './style/theme';
import './style/fonts.css';

const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/:templateId?" element={<AppShell />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </>
);

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);

if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
  });
}
