import React from 'react';
import './GettingStarted.module.css';

const GettingStarted = ({ name }) => (
  <div styleName="root">
    <div styleName="title">Welcome to Muil</div>

    <div styleName="text">
      <b>{name}</b>, now that you&apos;ve set up Muil it&apos;s time to write your first template{' '}
      <span role="img" aria-label="fire">
        🔥
      </span>
    </div>

    <a href="https://www.muil.io" target="_blank" rel="noopener noreferrer" styleName="get-started">
      Get Started →
    </a>
  </div>
);

GettingStarted.displayName = 'Getting Started Template';

GettingStarted.dynamicProps = {
  name: 'John',
};

export default GettingStarted;
