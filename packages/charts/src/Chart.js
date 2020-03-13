import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: Arial;
  height: ${({ height }) => height || 200}px;
  box-sizing: border-box;
`;

export const Container = styled.table`
  height: 100%;
  padding-top: 20px;
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

export const Column = styled.div`
  height: ${({ value }) => value}%;
  width: 50px;
  background: ${({ color }) => color || '#17a2b8'};
`;
