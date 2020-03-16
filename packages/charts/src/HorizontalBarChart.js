import React from 'react';
import { HorizontalWrapper, FullWidthCell, Row, Label, ColumnLabel } from './Chart';

const HorizontalBarChart = ({ className, color, width, values = [] }) => (
  <HorizontalWrapper className={className} width={width}>
    {values.map(({ label, value }, index) => (
      <tr key={index}>
        <td>
          <Label>{label}</Label>
        </td>
        <FullWidthCell>
          <Row value={value} color={color} />
          <ColumnLabel>{value}</ColumnLabel>
        </FullWidthCell>
      </tr>
    ))}
  </HorizontalWrapper>
);

export default HorizontalBarChart;
