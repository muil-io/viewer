import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Content from './Content';
import Options from './Options';
import getTemplates from '../config';
import useKnobs from '../hooks/useKnobs';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr auto;
  grid-template-rows: auto 100%;
  height: 100vh;
  overflow: hidden;
`;

const AppShell = () => {
  const defaultTemplates = useMemo(() => getTemplates(), []);
  const [selectedSize, setSelectedSize] = useState('full');

  const { templates, handleChangeKnob } = useKnobs({ defaultTemplates });

  return (
    <Wrapper>
      <TopBar selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      <SideBar templates={templates} />
      <Content templates={templates} selectedSize={selectedSize} />
      <Options templates={templates} onChangeKnob={handleChangeKnob} />
    </Wrapper>
  );
};

export default AppShell;
