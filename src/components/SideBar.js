import React, { useMemo } from 'react';
import styled from 'styled-components';
import Link from './Link';

const Wrapper = styled.div`
  grid-column: 1;
  background: ${({ theme }) => theme.app.contentBackground};
  box-shadow: 1px 2px 5px #0000003d;
  z-index: 1;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.sidebar.color};
  background: ${({ theme }) => theme.app.contentBackground};
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
  padding: 37px;
  border: 1px solid #e6e6e6;
`;

const SideBar = ({ templates }) => {
  const links = useMemo(() => Object.keys(templates).map(key => ({ key, name: templates[key].name })), [templates]);

  return (
    <Wrapper>
      <Logo>mUIL</Logo>

      {links.map(({ key, name }) => (
        <Link key={key} link={key} text={name} />
      ))}
    </Wrapper>
  );
};

export default SideBar;
