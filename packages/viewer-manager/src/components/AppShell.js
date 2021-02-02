import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import SideBar from './SideBar';
import Page from './Page';
import Content from './Content';
import Options from './Options';
import useTemplates from '../hooks/useTemplates';
import useDynamicProps from '../hooks/useDynamicProps';
import PanelStretchBar from './PanelStretchBar';
import { SIDE_BAR_DEFAULT_WIDTH, OPTIONS_DEFAULT_WIDTH } from '../constants';
import { minMaxSideBarWidth, minMaxOptionsWidth } from '../utils/panelsSize';

const Wrapper = styled.div`
  grid-template-columns: auto auto 1fr auto auto;
  display: grid;
  height: 100vh;
`;

const AppShell = () => {
  const defaultTemplates = useTemplates();
  const { templates, handleChangeKnob } = useDynamicProps({ defaultTemplates });
  const { templateId } = useParams();
  const selectedTemplate = templates?.[templateId];

  const [sideBarWidth, setSideBarWidth] = useState(SIDE_BAR_DEFAULT_WIDTH);
  const [optionWidth, setOptionsWidth] = useState(OPTIONS_DEFAULT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Wrapper>
      <SideBar templates={templates} sideBarWidth={sideBarWidth} />
      <PanelStretchBar
        column={2}
        width={sideBarWidth}
        onDrag={setSideBarWidth}
        onLimit={minMaxSideBarWidth}
        setIsDragging={setIsDragging}
      />

      <Page selectedTemplate={selectedTemplate} isDragging={isDragging}>
        <Content selectedTemplate={selectedTemplate} />
      </Page>

      <PanelStretchBar
        column={4}
        width={optionWidth}
        right
        onDrag={setOptionsWidth}
        onLimit={minMaxOptionsWidth}
        setIsDragging={setIsDragging}
      />
      <Options selectedTemplate={selectedTemplate} onChangeKnob={handleChangeKnob} optionWidth={optionWidth} />
    </Wrapper>
  );
};

export default AppShell;
