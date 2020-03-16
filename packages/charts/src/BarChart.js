import React from 'react';
import {
  VerticalWrapper,
  ColumnsRow,
  LabelsRow,
  Label,
  SpaceCell,
  Cell,
  ColumnBar,
  ColumnLabel,
  CategoryRow,
  CategorySpace,
  Bullet,
} from './Chart';

const BarChart = ({ className, height, series = [], categories, legend = false }) => (
  <VerticalWrapper className={className} cellSpacing="0" cellPadding="0" height={height}>
    {legend && (
      <>
        {categories.map(({ label, color }, index) => (
          <React.Fragment key={index}>
            <tr>
              <CategoryRow className="category-row" colSpan={categories.length * series.length}>
                <Bullet color={color} />
                <span>{label}</span>
              </CategoryRow>
            </tr>
            <tr>
              <CategorySpace className="category-space" />
            </tr>
          </React.Fragment>
        ))}

        <tr style={{ height: 30 }} />
      </>
    )}

    <ColumnsRow className="columns">
      {series.map(({ data, value }, index) => (
        <React.Fragment key={index}>
          {(data || [value]).map((dataValue, categoryIndex) => (
            <Cell key={categoryIndex} className="column">
              <ColumnLabel className="column label">{dataValue}</ColumnLabel>
              <ColumnBar value={dataValue} color={categories[categoryIndex].color} className="column bar" />
            </Cell>
          ))}

          {index < series.length - 1 && <SpaceCell />}
        </React.Fragment>
      ))}
    </ColumnsRow>

    <LabelsRow className="labels">
      {series.map(({ label }, index) => (
        <React.Fragment key={index}>
          <Cell colSpan={categories.length} className="label">
            <Label>{label}</Label>
          </Cell>
          {index < series.length - 1 && <SpaceCell />}
        </React.Fragment>
      ))}
    </LabelsRow>
  </VerticalWrapper>
);

export default BarChart;
