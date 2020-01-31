import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import StartPage from './StartPage';
import useContent from '../hooks/useContent';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Frame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Content = ({ templates }) => {
  const { templateId } = useParams();
  const url = useContent({ templates, templateId });

  if (!templateId) {
    return (
      <Wrapper>
        <StartPage />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Frame src={url} title="content" />
    </Wrapper>
  );
};

export default Content;
