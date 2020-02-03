import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink as BaseLink } from 'react-router-dom';

const activeLink = css`
  text-decoration: none;
  background: ${({ theme }) => theme.sidebar.linkBackground};
  color: ${({ theme }) => theme.sidebar.color};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background: ${({ theme }) => theme.sidebar.linkIndicator};
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: block;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.sidebar.linkColor};

  &:hover,
  &.active {
    ${activeLink};
  }
`;

const Link = ({ link, text }) => (
  <Wrapper as={BaseLink} to={link} activeClassName="active">
    {text}
  </Wrapper>
);

export default Link;
