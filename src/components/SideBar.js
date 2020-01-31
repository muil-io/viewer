import React, { useMemo } from 'react';
import styled from 'styled-components';
import Link from './Link';

const Wrapper = styled.div`
  grid-column: 1;
  background: ${({ theme }) => theme.app.contentBackground};
  box-shadow: 1px 0 1px 0 rgba(0, 0, 0, 0.5);
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.sidebar.color};
  background: ${({ theme }) => theme.app.secondaryBackground};
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
  padding: 40px;
  box-shadow: 3px 2px 6px #0000001f;
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
