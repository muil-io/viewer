import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const Cell = styled.td`
  width: ${({ value }) => value}%;
  height: 24px;
  background-color: ${({ color }) => color};
`;

const LineBar = ({ className, percents = [] }) => (
  <Wrapper className={className}>
    <tr>
      {percents.map(({ value, color }, index) => (
        <Cell key={index} value={value} color={color} />
      ))}
    </tr>
  </Wrapper>
);

export default LineBar;
