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

const SubTitle = styled.h2`
  font-size: 16px;
`;

const StartPage = () => (
  <Wrapper>
    <Content>
      <Title>No Template Selected</Title>
      <SubTitle>Press on template to show</SubTitle>
    </Content>
  </Wrapper>
);

export default StartPage;
