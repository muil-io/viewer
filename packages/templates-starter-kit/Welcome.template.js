import React from 'react';
import './Welcome.css';

const Welcome = ({ email, getStartedUrl }) => {
  return (
    <div>
      <div className="title">Welcome to Muil</div>
      <div className="text">{`Your Muil ID is ${email}`}</div>

      <div className="text">
        Now that you&apos;ve set up Muil it&apos;s time to write your first template{' '}
        <span role="img" aria-label="fire">
          🔥
        </span>
      </div>

      <a href={getStartedUrl} target="_blank" rel="noopener noreferrer" className="get-started">
        Get Started →
      </a>
    </div>
  );
};

Welcome.displayName = 'Welcome Template';

Welcome.dynamicProps = {
  email: 'user@example.com',
  getStartedUrl: 'https://www.muil.io',
};

export default Welcome;
