import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Arial;
  height: ${({ height }) => height || 200}px;
  box-sizing: border-box;
`;

const Container = styled.table`
  height: 100%;
  padding-top: 20px;
`;

const ValuesRow = styled.tr`
  height: 100%;
`;

const SpaceCell = styled.td`
  width: 5%;
`;

const Cell = styled.td`
  vertical-align: bottom;
  text-align: center;
`;

const Column = styled.div`
  height: ${({ value }) => value}%;
  width: 50px;
  background: ${({ color }) => color || '#17a2b8'};
`;

const BarChart = ({ className, color, height, values = [] }) => (
  <Wrapper className={className} height={height}>
    <Container>
      <ValuesRow>
        {values.map(({ value }, index) => (
          <React.Fragment key={index}>
            <Cell>
              {value}
              <Column value={value} color={color} />
            </Cell>
            {index < values.length - 1 && <SpaceCell />}
          </React.Fragment>
        ))}
      </ValuesRow>
      <tr>
        {values.map(({ label }, index) => (
          <React.Fragment key={index}>
            <Cell>{label}</Cell>
            {index < values.length - 1 && <SpaceCell />}
          </React.Fragment>
        ))}
      </tr>
    </Container>
  </Wrapper>
);

export default BarChart;
