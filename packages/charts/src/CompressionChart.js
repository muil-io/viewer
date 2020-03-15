import React from 'react';
import { VerticalWrapper, ValuesRow, LabelsRow, SpaceCell, Cell, Column } from './Chart';

const BarChart = ({ className, color1, color2, height, values = [] }) => (
  <VerticalWrapper className={className} cellSpacing="0" cellPadding="0" height={height}>
    <ValuesRow>
      {values.map(({ value1, value2 }, index) => (
        <React.Fragment key={index}>
          <Cell>
            {value1}
            <Column value={value1} color={color1} />
          </Cell>

          <Cell>
            {value2}
            <Column value={value2} color={color2} />
          </Cell>

          {index < values.length - 1 && <SpaceCell />}
        </React.Fragment>
      ))}
    </ValuesRow>

    <LabelsRow>
      {values.map(({ label }, index) => (
        <React.Fragment key={index}>
          <Cell colSpan="2">{label}</Cell>
          {index < values.length - 1 && <SpaceCell />}
        </React.Fragment>
      ))}
    </LabelsRow>
  </VerticalWrapper>
);

export default BarChart;
