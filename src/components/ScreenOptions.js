import React from 'react';
import styled from 'styled-components';
import { SCREEN_SIZES } from '../constants';

const Wrapper = styled.div`
  margin-top: 14px;
`;

const ScreenLink = styled.div`
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;

  > svg {
    border-radius: 100%;
    padding: 5px;
    box-sizing: content-box;

    ${({ active, theme }) => active && `background: ${theme.page.screenInactiveColor}`};

    path {
      fill: ${({ active, theme }) => (active ? theme.page.screenActiveColor : theme.page.screenInactiveColor)};
    }
  }
`;

const ScreenOptions = ({ selectedSize, setSelectedSize }) => (
  <Wrapper>
    {Object.keys(SCREEN_SIZES).map(sizeKey => {
      const SizeIcon = SCREEN_SIZES[sizeKey].icon;

      return (
        <ScreenLink key={sizeKey} active={selectedSize === sizeKey} onClick={() => setSelectedSize(sizeKey)}>
          <SizeIcon />
        </ScreenLink>
      );
    })}
  </Wrapper>
);

export default ScreenOptions;
