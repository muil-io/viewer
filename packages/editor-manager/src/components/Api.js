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

const Api = ({ name, dynamicProps }) => {
  const requestValue = {
    subject: name,
    from: "'Example' <no-replay@example.com>",
    to: 'example1@example.com',
    cc: 'example2@example.com',
    bcc: 'example3@example.com',
    props: dynamicProps,
  };
  return (
    <Wrapper>
      {dynamicProps ? <Editor value={requestValue} /> : <EmptyState>No Dynamic props defined</EmptyState>}
    </Wrapper>
  );
};

export default Api;
