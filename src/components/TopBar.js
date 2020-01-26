import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SCREEN_SIZES } from '../constants';

const Wrapper = styled.div`
  grid-column: 1/4;
  padding: 15px;
  background-color: #323233;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > a {
    color: #fff;
    font-size: 1.3rem;
  }
`;

const ScreenLink = styled.div`
  display: inline-block;
  font-weight: 500;
  margin-left: 10px;
  cursor: pointer;
  text-transform: capitalize;
  path {
    fill: ${({ active }) => (active ? '#fff' : '#adadad')};
  }
`;

const TopBar = ({ selectedSize, setSelectedSize }) => (
  <Wrapper>
    <Link to="/">Muil.io</Link>
    <div>
      {Object.keys(SCREEN_SIZES).map(sizeKey => {
        const SizeIcon = SCREEN_SIZES[sizeKey].icon;

        return (
          <ScreenLink key={sizeKey} active={selectedSize === sizeKey} onClick={() => setSelectedSize(sizeKey)}>
            <SizeIcon />
          </ScreenLink>
        );
      })}
    </div>
  </Wrapper>
);

export default TopBar;
