import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import ArrowIcon from '../assets/arrow.svg';
import BaseSideBarHeader from './SideBarHeader';
import { Tabs, Tab } from './core/Tabs';
import scrollbar from '../style/scrollbar';
import Knobs from './Knobs';

const Wrapper = styled.div`
  grid-column: 3;
  background: ${({ theme }) => theme.app.contentBackground};
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
  top: 30px;
  left: -37px;
  box-shadow: 2px -4px 8px -3px rgba(0, 0, 0, 0.3);
  transform: rotate(-90deg);
  z-index: 1;
  cursor: pointer;
`;

const Arrow = styled(({ isVisible, ...props }) => <ArrowIcon {...props} />)`
  transform: rotate(${({ isVisible }) => (isVisible ? 0 : 180)}deg);
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

const Options = ({ templates, onChangeKnob }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('props');
  const { templateId } = useParams();
  const { knobs } = templates[templateId] || {};

  if (!templateId) {
    return null;
  }

  return (
    <Wrapper isVisible={isVisible}>
      <ToggleButton onClick={() => setIsVisible(!isVisible)}>
        <Arrow isVisible={isVisible} />
      </ToggleButton>

      <Content>
        <SideBarHeader>
          <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
            <Tab name="props">Props</Tab>
            <Tab name="api">API</Tab>
          </Tabs>
        </SideBarHeader>

        {activeTab === 'props' && <Knobs knobs={knobs} onChangeKnob={value => onChangeKnob({ templateId, value })} />}
      </Content>
    </Wrapper>
  );
};

export default Options;
