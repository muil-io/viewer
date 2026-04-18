import React, { useRef } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const StretchBar = styled.div`
  width: 4px;
  margin-left: -4px;
  cursor: col-resize;
  grid-column: ${({ column }) => column};
  z-index: 1;
`;

const PanelStretchBar = ({ column, width, right, onDrag, onLimit, setIsDragging }) => {
  const nodeRef = useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      axis="x"
      position={{ x: 0 }}
      onDrag={(e, { deltaX }) => onDrag(onLimit(width + (right ? -1 : 1) * deltaX))}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
    >
      <StretchBar ref={nodeRef} column={column} />
    </Draggable>
  );
};

export default PanelStretchBar;
