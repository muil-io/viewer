/* eslint-disable react/button-has-type */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.3);
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 600px;
  height: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
`;

const Body = styled.div`
  color: #4c4949;
  display: flex;
  flex-direction: column;
  > h2 {
    text-decoration: underline;
    margin-bottom: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  > button {
    background-color: rgb(118, 39, 190);
    opacity: 0.9;
    border: 0;
    color: white;
    width: 108px;
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
`;

const Modal = ({ title, text, onSubmit }) =>
  ReactDOM.createPortal(
    <Wrapper>
      <Box>
        <Body>
          <h2>{title}</h2>
          <h3>{text}</h3>
        </Body>
        <Footer>
          <button onClick={onSubmit}>OK</button>
        </Footer>
      </Box>
    </Wrapper>,
    document.getElementById('modal'),
  );

export default Modal;
