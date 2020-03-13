import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  background: #efefef;
`;

const Layout = ({ children }) => <Wrapper>{children}</Wrapper>;

export default Layout;
