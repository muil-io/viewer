import React, { useMemo } from 'react';
import styled from 'styled-components';
import Link from './Link';

const Wrapper = styled.div`
  grid-column: 1;
  grid-row: 2/4;
  background: #252526;
  padding: 20px;
`;

const SideBar = ({ templates }) => {
  const links = useMemo(() => Object.keys(templates).map(key => ({ key, name: templates[key].name })), [templates]);

  return (
    <Wrapper>
      {links.map(({ key, name }) => (
        <Link key={key} link={key} text={name} />
      ))}
    </Wrapper>
  );
};

export default SideBar;
