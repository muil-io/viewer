import React from 'react';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce';

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
  border-radius: 8px;
`;

const Content = ({ selectedTemplate }) => {
  const debounceTemplate = useDebounce(selectedTemplate, 300);
  const currentTemplate = selectedTemplate?.id !== debounceTemplate?.id ? selectedTemplate : debounceTemplate;
  return (
    <Wrapper>
      <Frame
        title="content"
        src={`iframe.html?templateId=${currentTemplate?.id}&dynamicProps=${encodeURIComponent(
          JSON.stringify(currentTemplate?.dynamicProps),
        )}`}
      />
    </Wrapper>
  );
};

export default Content;
