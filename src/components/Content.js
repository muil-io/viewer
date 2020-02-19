import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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

const Content = ({ templates }) => {
  const { templateId } = useParams();
  const template = templates[templateId];

  return (
    <Wrapper>
      <Frame
        title="content"
        src={`http://localhost:3002?templateId=${templateId}&dynamicProps=${encodeURIComponent(
          JSON.stringify(template?.dynamicProps),
        )}`}
      />
    </Wrapper>
  );
};

export default Content;
