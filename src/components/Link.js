import React from 'react';
import styled from 'styled-components';
import { Link as BaseLink } from 'react-router-dom';

const Wrapper = styled.div`
  display: block;
  padding: 4px 0;
  cursor: pointer;
  color: #fff;

  &:hover {
    color: #bdafaf;
    text-decoration: none;
  }
`;

const Link = ({ link, text }) => (
  <Wrapper as={BaseLink} to={link}>
    {text}
  </Wrapper>
);

export default Link;
