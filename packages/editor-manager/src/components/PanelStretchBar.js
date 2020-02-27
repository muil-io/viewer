import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const StretchBar = styled.div`
  width: 4px;
  margin-left: -4px;
  cursor: col-resize;
  grid-column: ${({ column }) => column};
  z-index: 1;
  transform: none !important;
`;

const PanelStretchBar = ({ column, onDrag }) => (
  <Draggable axis="x" onDrag={(e, { x }) => onDrag(x)}>
    <StretchBar column={column} />
  </Draggable>
);

export default PanelStretchBar;
