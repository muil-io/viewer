import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import SideBar from './SideBar';
import Page from './Page';
import Content from './Content';
import Options from './Options';
import useTemplates from '../hooks/useTemplates';
import useDynamicProps from '../hooks/useDynamicProps';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr auto;
  height: 100vh;
  overflow: hidden;
`;

const AppShell = () => {
  const [selectedSize, setSelectedSize] = useState('full');
  const defaultTemplates = useTemplates();
  const { templates, handleChangeKnob } = useDynamicProps({ defaultTemplates });
  const { templateId } = useParams();
  const selectedTemplate = templates?.[templateId];

  return (
    <Wrapper>
      <SideBar templates={templates} />
      <Page selectedTemplate={selectedTemplate} selectedSize={selectedSize} setSelectedSize={setSelectedSize}>
        <Content selectedTemplate={selectedTemplate} />
      </Page>

      <Options selectedTemplate={selectedTemplate} onChangeKnob={handleChangeKnob} />
    </Wrapper>
  );
};

export default AppShell;
