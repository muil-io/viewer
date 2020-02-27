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
import { minMaxSideBarWidth, minMaxOptionsWidth } from '../utils/panelsSize';

const Wrapper = styled.div.attrs(({ sideBarOffset, isOptionsPanelVisible, optionsOffset }) => ({
  style: {
    gridTemplateColumns: `${minMaxSideBarWidth(sideBarOffset)}px auto 1fr auto ${
      !isOptionsPanelVisible ? 0 : minMaxOptionsWidth(optionsOffset)
    }px`,
  },
}))`
  display: grid;
  height: 100vh;
`;

const AppShell = () => {
  const [selectedSize, setSelectedSize] = useState('full');
  const defaultTemplates = useTemplates();
  const { templates, handleChangeKnob } = useDynamicProps({ defaultTemplates });
  const { templateId } = useParams();
  const selectedTemplate = templates?.[templateId];

  const [sideBarOffset, setSideBarOffset] = useState(0);
  const [optionsOffset, setOptionsOffset] = useState(0);
  const [isOptionsPanelVisible, setIsOptionsPanelVisible] = useState(true);

  return (
    <Wrapper sideBarOffset={sideBarOffset} optionsOffset={optionsOffset} isOptionsPanelVisible={isOptionsPanelVisible}>
      <SideBar templates={templates} />
      <PanelStretchBar column={2} onDrag={setSideBarOffset} />

      <Page selectedTemplate={selectedTemplate} selectedSize={selectedSize} setSelectedSize={setSelectedSize}>
        <Content selectedTemplate={selectedTemplate} />
      </Page>

      <PanelStretchBar column={4} onDrag={setOptionsOffset} />
      <Options
        selectedTemplate={selectedTemplate}
        onChangeKnob={handleChangeKnob}
        isOptionsPanelVisible={isOptionsPanelVisible}
        setIsOptionsPanelVisible={setIsOptionsPanelVisible}
      />
    </Wrapper>
  );
};

export default AppShell;
