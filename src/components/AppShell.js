import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import Page from './Page';
import Content from './Content';
import Options from './Options';
import getTemplates from '../utils/getTemplates';
import useDynamicProps from '../hooks/useDynamicProps';
import '../style/fonts.css';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr auto;
  height: 100vh;
  overflow: hidden;
  font-family: HelveticaNeue;
`;

const AppShell = () => {
  const defaultTemplates = useMemo(() => getTemplates(), []);
  const [selectedSize, setSelectedSize] = useState('full');

  const { templates, handleChangeKnob } = useDynamicProps({ defaultTemplates });

  return (
    <Wrapper>
      <SideBar templates={templates} />
      <Page templates={templates} selectedSize={selectedSize} setSelectedSize={setSelectedSize}>
        <Content templates={templates} />
      </Page>

      <Options templates={templates} onChangeKnob={handleChangeKnob} />
    </Wrapper>
  );
};

export default AppShell;
