import React from 'react';
import styled from 'styled-components';

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

const Content = ({ selectedTemplate }) => (
  <Wrapper>
    <Frame
      title="content"
      src={`http://localhost:8081?templateId=${selectedTemplate?.id}&dynamicProps=${encodeURIComponent(
        JSON.stringify(selectedTemplate?.dynamicProps),
      )}`}
    />
  </Wrapper>
);

export default Content;
