import React from 'react';
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
	0%{transform: translateX(-430px);}
	6%{transform: translateX(0px);}
	94%{transform: translateX(0px);}
	100%{transform: translateX(-430px);}
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 10;
`;

const Message = styled.div`
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  padding: 13px;
  border-radius: 8px;
  animation: ${animation} 4s ease-out forwards;
`;

const Text = styled.div`
  max-width: 210px;
`;

const Toaster = ({ text, onClose }) => (
  <Wrapper>
    <Message onAnimationEnd={() => onClose()}>
      <Text>{text}</Text>
    </Message>
  </Wrapper>
);

export default Toaster;
