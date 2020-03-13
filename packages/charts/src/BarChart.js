import React from 'react';
import { Wrapper, Container, ValuesRow, LabelsRow, SpaceCell, Cell, Column } from './Chart';

const BarChart = ({ className, color, height, values = [] }) => (
  <Wrapper className={className} height={height}>
    <Container cellSpacing="0" cellPadding="0">
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

      <LabelsRow>
        {values.map(({ label }, index) => (
          <React.Fragment key={index}>
            <Cell>{label}</Cell>
            {index < values.length - 1 && <SpaceCell />}
          </React.Fragment>
        ))}
      </LabelsRow>
    </Container>
  </Wrapper>
);

export default BarChart;
