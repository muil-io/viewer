import styled, { css } from 'styled-components';

const commonWrapper = css`
  font-family: Arial;
  padding-top: 20px;
`;

export const VerticalWrapper = styled.table`
  ${commonWrapper};
  height: ${({ height }) => height || 200}px;
`;

export const HorizontalWrapper = styled.table`
  ${commonWrapper};
  width: 100%;
  max-width: ${({ width }) => width || 200}px;
`;

export const ValuesRow = styled.tr`
  height: 100%;
  > td {
    border-bottom: 1px solid #d5d5d4;
  }
`;

export const LabelsRow = styled.tr`
  > td {
    padding: 6px;
    font-size: 14px;
    max-width: 50px;
    vertical-align: top;
  }
`;

export const SpaceCell = styled.td`
  width: 5%;
`;

export const Cell = styled.td`
  vertical-align: bottom;
  text-align: center;
`;

export const FullWidthCell = styled.td`
  width: 100%;
  white-space: nowrap;
  > span {
    margin-left: 5px;
  }
`;

export const Column = styled.div`
  height: ${({ value }) => value}%;
  max-width: 50px;
  background: ${({ color }) => color || '#17a2b8'};
`;

export const Row = styled.div`
  width: ${({ value }) => value}%;
  height: 30px;
  background: ${({ color }) => color || '#17a2b8'};
  display: inline-block;
  vertical-align: middle;
`;

export const Bullet = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 7px;
  background: ${({ color }) => color};
`;
