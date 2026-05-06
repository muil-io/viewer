import React from 'react';
import logo from './logo.png';
import styles from './GettingStarted.module.css';

const GettingStarted = ({ name }) => (
  <div className={styles.root}>
    <div>
      <img src={logo} className={styles.logo} alt="logo" />
    </div>

    <div className={styles.title}>Welcome to Muil</div>

    <div className={styles.text}>
      <b>{name}</b>, now that you&apos;ve set up Muil it&apos;s time to write your first template{' '}
      <span role="img" aria-label="fire">
        🔥
      </span>
    </div>

    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={styles['get-started']}>
      Get Started →
    </a>
  </div>
);

GettingStarted.displayName = 'Getting Started Template';

GettingStarted.dynamicProps = {
  name: 'John',
};

export default GettingStarted;
