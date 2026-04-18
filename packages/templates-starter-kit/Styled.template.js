import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  background: white;
  font-family: sans-serif;
  font-size: 16px;
  color: #424242;
  padding: 40px 30px;
`;

const Card = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 28px;
  font-weight: 700;
`;

const Text = styled.p`
  margin: 0 0 24px 0;
  line-height: 1.5;
  opacity: 0.92;
`;

const Button = styled.a`
  display: inline-block;
  padding: 12px 28px;
  background: white;
  color: #764ba2;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
`;

const Styled = ({ name, ctaUrl }) => (
  <Root>
    <Card>
      <Title>Hi {name} 👋</Title>
      <Text>
        This template is styled with styled-components — CSS-in-JS with a dynamic theme-friendly API.
      </Text>
      <Button href={ctaUrl} target="_blank" rel="noopener noreferrer">
        Learn more →
      </Button>
    </Card>
  </Root>
);

Styled.displayName = 'Styled Components Template';

Styled.dynamicProps = {
  name: 'Jane',
  ctaUrl: 'https://styled-components.com',
};

export default Styled;
