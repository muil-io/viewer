import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  background: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.color};
  border: none;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 4px;
  box-shadow: 1px 2px 5px ${({ theme }) => theme.button.shadowColors};

  &:hover {
    box-shadow: 1px 2px 5px ${({ theme }) => theme.button.background};
  }
`;

const Button = ({ children }) => {
  return <Wrapper type="button">{children}</Wrapper>;
};

export default Button;
