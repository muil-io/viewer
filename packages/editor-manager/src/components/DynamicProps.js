import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../constants';
import Editor from './Editor';
import EmptyState from './EmptyState';

const Wrapper = styled.div`
  position: absolute;
  top: ${HEADER_HEIGHT}px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  padding: 20px;
  background: #fff;
`;

const DynamicProps = ({ dynamicProps, onChangeKnob }) => (
  <Wrapper>
    {dynamicProps ? (
      <Editor value={dynamicProps} onChange={onChangeKnob} />
    ) : (
      <EmptyState>No Dynamic props defined</EmptyState>
    )}
  </Wrapper>
);

export default DynamicProps;
