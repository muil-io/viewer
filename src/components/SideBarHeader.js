import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../constants';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.sidebar.color};
  background: ${({ theme }) => theme.app.contentBackground};
  border-bottom: 1px solid ${({ theme }) => theme.sidebar.border};
  height: ${HEADER_HEIGHT}px;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  > span {
    background: ${({ theme }) => theme.app.primaryBackground};
    color: ${({ theme }) => theme.sidebar.logoColor};
    padding: 5px 10px;
    margin-right: 2px;
  }
`;

const SideBarHeader = ({ className, children }) => <Wrapper className={className}>{children}</Wrapper>;

export default SideBarHeader;
