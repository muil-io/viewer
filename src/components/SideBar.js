import React, { useMemo } from 'react';
import styled from 'styled-components';
import SideBarHeader from './SideBarHeader';
import scrollbar from '../style/scrollbar';
import Link from './Link';

const Wrapper = styled.div`
  grid-column: 1;
  background: ${({ theme }) => theme.app.contentBackground};
  box-shadow: 1px 2px 5px ${({ theme }) => theme.sidebar.shadowColors};
  z-index: 1;
  position: relative;
  overflow: auto;
  ${scrollbar};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 32px;
  text-align: center;

  > span {
    background: ${({ theme }) => theme.app.primaryBackground};
    color: ${({ theme }) => theme.sidebar.logoColor};
    padding: 5px 10px;
    margin-right: 2px;
  }
`;

const SideBar = ({ templates }) => {
  const links = useMemo(() => Object.keys(templates).map(key => ({ key, name: templates[key].name })), [templates]);

  return (
    <Wrapper>
      <SideBarHeader>
        <Logo>
          <span>M</span>
          uil
        </Logo>
      </SideBarHeader>

      {links.map(({ key, name }) => (
        <Link key={key} link={key} text={name} />
      ))}
    </Wrapper>
  );
};

export default SideBar;
