import React from 'react';
import styled from 'styled-components';
import scrollbar from '../style/scrollbar';
import { HEADER_HEIGHT } from '../constants';
import Viewer from './Viewer';

const Wrapper = styled.div`
  position: absolute;
  top: ${HEADER_HEIGHT}px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  padding: 20px;
  background: #fff;
  ${scrollbar};
`;

const Title = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.dark};

  > strong {
    font-weight: 500;
    margin-right: 7px;
  }
`;

const DynamicProps = ({ id, dynamicProps, onChangeKnob }) => (
  <Wrapper>
    <Title>
      <strong>ID:</strong>
      {id?.toLowerCase()}
    </Title>

    <Title>
      <strong>Props:</strong>
      {dynamicProps ? '' : 'No Dynamic props defined'}
    </Title>

    {dynamicProps && <Viewer value={dynamicProps} onChange={onChangeKnob} />}
  </Wrapper>
);

export default DynamicProps;
