import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.emptyState.color};
  padding: 20px;
`;

const EmptyState = ({ children }) => <Wrapper>{children}</Wrapper>;

export default EmptyState;
