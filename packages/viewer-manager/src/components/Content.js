import React, { useEffect, useRef } from 'react';
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
  const iframeRef = useRef();
  const debounceTemplate = useDebounce(selectedTemplate, 300);
  const currentTemplate = selectedTemplate?.id !== debounceTemplate?.id ? selectedTemplate : debounceTemplate;

  useEffect(() => {
    iframeRef.current.contentWindow.postMessage({ dynamicProps: currentTemplate?.dynamicProps });
  }, [currentTemplate]);

  return (
    <Wrapper>
      <Frame ref={iframeRef} title="content" src={`iframe.html?templateId=${currentTemplate?.id}`} />
    </Wrapper>
  );
};

export default Content;
