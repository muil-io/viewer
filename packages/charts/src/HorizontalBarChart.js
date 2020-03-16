import React from 'react';
import { HorizontalWrapper, FullWidthCell, Row, ColumnLabel, SpaceRow, LabelRow } from './Chart';
import Legend from './Legend';

const HorizontalBarChart = ({ className, maxWidth, series = [], categories, legend = false }) => (
  <HorizontalWrapper className={className} maxWidth={maxWidth} cellSpacing="0" cellPadding="0">
    {legend && <Legend categories={categories} />}

    {series.map(({ label, value, data }, index) => (
      <React.Fragment key={index}>
        {(data || [value]).map((dataValue, categoryIndex) => (
          <tr key={categoryIndex}>
            {categoryIndex === 0 && (
              <LabelRow rowSpan={categories.length} className="label">
                <span>{label}</span>
              </LabelRow>
            )}

            <FullWidthCell>
              <Row value={dataValue} color={categories[categoryIndex].color} className="column bar" />
              <ColumnLabel className="column label">{dataValue}</ColumnLabel>
            </FullWidthCell>
          </tr>
        ))}
        <SpaceRow />
      </React.Fragment>
    ))}
  </HorizontalWrapper>
);

export default HorizontalBarChart;
