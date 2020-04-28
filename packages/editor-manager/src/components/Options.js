import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowIcon from '../assets/arrow.svg';
import CloseIcon from '../assets/close.svg';
import BaseSideBarHeader from './SideBarHeader';
import Tabs from './Tabs';
import Tab from './Tab';
import scrollbar from '../style/scrollbar';
import DynamicProps from './DynamicProps';
import Api from './Api';

const Wrapper = styled.div.attrs(({ optionWidth }) => ({
  style: {
    width: optionWidth,
  },
}))`
  grid-column: 5;
  background: ${({ theme }) => theme.app.contentBackground};
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 50px;
  height: 25px;
  background: ${({ theme }) => theme.app.contentBackground};
  top: 103px;
  left: -38px;
  box-shadow: 2px -4px 8px -3px rgba(0, 0, 0, 0.3);
  transform: rotate(-90deg);
  z-index: 1;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
`;

const Arrow = styled(ArrowIcon)`
  transform: rotate(180deg);
  path {
    fill: ${({ theme }) => theme.options.color};
  }
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  path {
    fill: ${({ theme }) => theme.options.color};
  }
`;

const SideBarHeader = styled(BaseSideBarHeader)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Content = styled.div`
  overflow: hidden auto;
  height: 100%;
  ${scrollbar};
`;

const Options = ({ selectedTemplate, onChangeKnob, optionWidth }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('props');
  const { name, dynamicProps } = selectedTemplate || {};

  return (
    <Wrapper optionWidth={isVisible ? optionWidth : 0}>
      {!isVisible && (
        <ToggleButton onClick={() => setIsVisible(true)}>
          <Arrow />
        </ToggleButton>
      )}

      {isVisible && (
        <Content>
          <SideBarHeader>
            <CloseButton onClick={() => setIsVisible(false)} />

            <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
              <Tab name="props">Dynamic Props</Tab>
              <Tab name="api">API</Tab>
            </Tabs>
          </SideBarHeader>

          {activeTab === 'props' && (
            <DynamicProps
              dynamicProps={dynamicProps}
              onChangeKnob={value => onChangeKnob({ templateId: selectedTemplate?.id, value })}
            />
          )}

          {activeTab === 'api' && <Api name={name} dynamicProps={dynamicProps} />}
        </Content>
      )}
    </Wrapper>
  );
};

export default Options;
