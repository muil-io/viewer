import React from 'react';

const style = {
  container: {
    margin: '20px auto',
    textAlign: 'center',
  },
  button: {
    padding: '15px 30px',
    fontFamily: 'Arial',
    boxShadow: '3px 3px 10px #00000069',
    borderRadius: '6px',
    fontSize: 21,
    outline: 'none',
    border: '2px solid transparent',
  },
  primary: {
    background: 'linear-gradient(to top right,#332557,#6735E0)',
    color: '#fff',
  },
  secondary: {
    background: '#fff',
    borderColor: '#6735E0',
    color: '#332557',
    marginLeft: 20,
  },
};

const Button = () => (
  <div style={style.container}>
    <button type="button" style={{ ...style.button, ...style.primary }}>
      Click Me!
    </button>
    <button type="button" style={{ ...style.button, ...style.secondary }}>
      Or Me
    </button>
  </div>
);

Button.displayName = 'Button';

export default Button;
