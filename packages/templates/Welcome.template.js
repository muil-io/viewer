import React from 'react';

const style = {
  box: {
    margin: '20px auto',
    textAlign: 'center',
    display: 'block',
    maxWidth: '500px',
    padding: '30px',
    fontFamily: 'Arial',
    boxShadow: '3px 3px 10px #00000069',
    borderRadius: '6px',
    background: 'linear-gradient(to top right,#332557,#6735E0)',
    color: '#fff',
  },
  title: {
    marginBottom: 20,
    fontSize: 21,
    fontWeight: 'bold',
  },
};

const Welcome = () => (
  <div style={style.box}>
    <div style={style.title}>Welcome to Muil</div>
    <div>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </div>
  </div>
);

Welcome.displayName = 'Welcome Template';

export default Welcome;
