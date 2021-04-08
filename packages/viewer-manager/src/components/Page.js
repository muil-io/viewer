import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import useDimension from '../hooks/useDimension';
import DownloadOptions from './DownloadOptions';
import { HEADER_HEIGHT, HEADER_BACKGROUND_HEIGHT } from '../constants';
import ellipsis from '../style/ellipsis';

const Wrapper = styled.div`
  position: relative;
  grid-column: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.app.secondaryBackground};
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.app.primaryBackground};
  height: ${HEADER_BACKGROUND_HEIGHT}px;
  padding: 24px 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TemplateName = styled.div`
  color: ${({ theme }) => theme.page.templateNameColor};
  font-size: 32px;
  font-weight: 300;
  ${ellipsis};
`;

const Container = styled.div`
  background: ${({ theme }) => theme.app.contentBackground};
  margin: ${HEADER_HEIGHT}px 80px 40px;
  border-radius: 8px;
  width: calc(100% - 160px);
  max-width: calc(100% - 160px);
  height: 100%;
  z-index: 1;
  transition: 200ms;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  ${({ isDragging }) =>
    isDragging &&
    css`
      &:before {
        content: '';
        position: absolute;
        background: transparent;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        point-events: none;
      }
    `}

  &:after {
    text-align: right;
    content: '${({ $dimensions }) => `${$dimensions.width} x ${$dimensions.height}`}';
    font-size: 10px;
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const Page = ({ selectedTemplate, isDragging, children }) => {
  const containerRef = useRef();
  const { width, height } = useDimension(containerRef);

  return (
    <Wrapper>
      <TopBar>
        <TemplateName>{selectedTemplate?.name || 'No Template Selected'}</TemplateName>
        <DownloadOptions selectedTemplate={selectedTemplate} />
      </TopBar>

      <Container ref={containerRef} isDragging={isDragging} $dimensions={{ width, height }}>
        {children}
      </Container>
    </Wrapper>
  );
};

export default Page;
