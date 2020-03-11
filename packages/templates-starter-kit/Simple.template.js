import React from 'react';
import './Simple.css';

const HelloWorld = ({ name, callToActionUrl }) => {
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

HelloWorld.displayName = 'Simple Template';

HelloWorld.dynamicProps = {
  name: 'John',
  callToActionUrl: 'https://www.muil.io',
};

export default HelloWorld;
