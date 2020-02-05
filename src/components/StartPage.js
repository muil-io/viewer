import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.page.color};
`;

const Title = styled.h1`
  font-size: 40px;
`;

const StartPage = () => (
  <Wrapper>
    <Content>
      <Title>No Template Selected</Title>
    </Content>
  </Wrapper>
);

export default StartPage;
