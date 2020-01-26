import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import StartPage from './StartPage';
import { SCREEN_SIZES } from '../constants';
import useContent from '../hooks/useContent';

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1e1e1e;
`;

const Frame = styled.iframe`
  background-color: #fff;
  width: ${({ selectedSize }) => SCREEN_SIZES[selectedSize].size};
  height: 100%;
  border: none;
  transition: 200ms;
`;

const Content = ({ templates, selectedSize }) => {
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
      <Frame selectedSize={selectedSize} src={url} title="content" />
    </Wrapper>
  );
};

export default Content;
