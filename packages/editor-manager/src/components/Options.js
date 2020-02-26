import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ArrowIcon from '../assets/arrow.svg';
import CloseIcon from '../assets/close.svg';
import BaseSideBarHeader from './SideBarHeader';
import Tabs from './Tabs';
import Tab from './Tab';
import scrollbar from '../style/scrollbar';
import DynamicProps from './DynamicProps';

const Wrapper = styled.div`
  grid-column: 3;
  background: ${({ theme }) => theme.app.secondaryBackground};
  width: 350px;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: 300ms;
  will-change: width;

  ${({ isVisible }) =>
    !isVisible &&
    css`
      width: 0px;
    `}
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
  left: -37px;
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

const ComingSoon = styled.div`
  text-align: center;
  margin: 20px;
`;

const Options = ({ selectedTemplate, onChangeKnob }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('props');
  const { dynamicProps } = selectedTemplate || {};

  return (
    <Wrapper isVisible={isVisible}>
      {!isVisible && (
        <ToggleButton onClick={() => setIsVisible(true)}>
          <Arrow />
        </ToggleButton>
      )}

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

        {activeTab === 'api' && <ComingSoon>Coming Soon</ComingSoon>}
      </Content>
    </Wrapper>
  );
};

export default Options;
