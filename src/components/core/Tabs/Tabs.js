import styled from 'styled-components';
import React, { Children, cloneElement } from 'react';

const Wrapper = styled.div`
  display: flex;
`;

const Tabs = ({ activeTab, onTabChange, children }) => (
  <Wrapper>
    {Children.map(children, child =>
      cloneElement(child, {
        activeTab: activeTab === child.props.name,
        onClick: () => onTabChange(child.props.name),
      }),
    )}
  </Wrapper>
);

export default Tabs;
