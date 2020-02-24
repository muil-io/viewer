import React from 'react';
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
	0% {opacity: 0.6;}
	100% {opacity: 1;}
`;

const Blur = styled.div`
  background: ${({ theme }) => theme.sidebar.loading};
  padding: 11px 30px;
  margin: 20px 20px;
  position: relative;
  animation: ${animation} 1s infinite alternate;

  &:nth-child(2) {
    width: 30%;
  }

  &:nth-child(3) {
    width: 60%;
  }

  &:nth-child(4) {
    width: 80%;
  }

  &:nth-child(5) {
    width: 70%;
  }
`;

const LoadingPlaceHolder = () => {
  return (
    <>
      <Blur />
      <Blur />
      <Blur />
      <Blur />
    </>
  );
};

export default LoadingPlaceHolder;
