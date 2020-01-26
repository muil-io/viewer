import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  background: red;
  color: white;

  @media only screen and (max-width: 700px) {
    background: green;
  }

  @media only screen and (max-width: 400px) {
    background: blue;
  }
`;

const Template1 = () => <Wrapper>Template use Media Query</Wrapper>;

Template1.displayName = 'Template use Media Query';

export default Template1;
