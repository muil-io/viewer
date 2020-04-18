import React from 'react';
import './Simple.css';

const Simple = ({ name, callToActionUrl }) => {
  return (
    <div className="root">
      <div className="content">
        <p className="text">{`Hi ${name},`}</p>
        <p className="text">
          Sometimes you just need a simple HTML email with a simple design and clear call to action. This is it.
        </p>

        <a href={callToActionUrl} target="_blank" rel="noopener noreferrer" className="button">
          Call to Action
        </a>

        <p className="text">Good luck!</p>
      </div>
    </div>
  );
};

Simple.displayName = 'Simple Template';

Simple.dynamicProps = {
  name: 'John',
  callToActionUrl: 'https://www.muil.io',
};

export default Simple;
