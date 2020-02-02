import React, { useMemo } from 'react';
import styled from 'styled-components';
import scrollbar from '../style/scrollbar';
import Link from './Link';

const Wrapper = styled.div`
  grid-column: 1;
  background: ${({ theme }) => theme.app.contentBackground};
  box-shadow: 1px 2px 5px #0000003d;
  z-index: 1;
  position: relative;
  overflow: auto;
  ${scrollbar};
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.sidebar.color};
  background: ${({ theme }) => theme.app.contentBackground};
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
  padding: 37px;
  border: 1px solid #e6e6e6;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
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
