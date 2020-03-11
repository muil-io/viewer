import React from 'react';
import './Simple.css';

const HelloWorld = ({ name, callToActionUrl }) => {
  return (
    <div styleName="root">
      <div styleName="content">
        <p styleName="text">{`Hi ${name},`}</p>
        <p styleName="text">
          Sometimes you just need a simple HTML email with a simple design and clear call to action. This is it.
        </p>

        <a href={callToActionUrl} target="_blank" rel="noopener noreferrer" styleName="button">
          Call to Action
        </a>

        <p styleName="text">Good luck!</p>
      </div>
      <div classNstyleNameame="subtitle">Made with muil.io</div>
    </div>
  );
};

HelloWorld.displayName = 'Simple Template';

HelloWorld.dynamicProps = {
  name: 'John',
  callToActionUrl: 'https://www.muil.io',
};

export default HelloWorld;
