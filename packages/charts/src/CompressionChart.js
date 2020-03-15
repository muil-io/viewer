import React from 'react';
import { VerticalWrapper, ValuesRow, LabelsRow, SpaceCell, Cell, Column, Bullet } from './Chart';

const BarChart = ({ className, color1, color2, height, values = [], legend = false, legend1, legend2 }) => (
  <VerticalWrapper className={className} cellSpacing="0" cellPadding="0" height={height}>
    {legend && (
      <>
        <tr>
          <td colSpan={values.length * 2}>
            <Bullet color={color1} />
            <span>{legend1 || 'BAR 1'}</span>
          </td>
        </tr>

        <tr>
          <td colSpan={values.length * 2}>
            <Bullet color={color2} />
            <span>{legend2 || 'BAR 2'}</span>
          </td>
        </tr>

        <tr style={{ height: 30 }} />
      </>
    )}
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
