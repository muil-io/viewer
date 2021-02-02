import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import downloadFile from '../utils/downloadFile';

const Wrapper = styled.div`
  display: flex;
`;

const ScreenLink = styled.div`
  display: inline-block;
  cursor: ${({ $isLoading }) => ($isLoading ? 'no-drop' : 'pointer')};

  > svg {
    padding: 5px;
    width: 25px;
    box-sizing: content-box;

    path {
      fill: ${({ theme, $isLoading }) => ($isLoading ? theme.colors.gray1 : theme.colors.gray2)};
      transition: 200ms;
    }
  }

  &:hover > svg path {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const TYPES = ['pdf', 'png', 'html'];
const BASE_API = '/api/renderTemplate';

const ScreenOptions = ({ selectedTemplate }) => {
  const { id, dynamicProps } = selectedTemplate || {};

  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = useCallback(
    async (selectedType) => {
      try {
        setIsLoading(true);
        const result = await fetch(BASE_API, {
          method: 'post',
          body: JSON.stringify({ id, props: dynamicProps, type: selectedType }),
          headers: { Accept: 'application/json', 'Content-Type': 'application/json', responseType: 'blob' },
        });

        const data = await result.blob();
        // eslint-disable-next-line no-unused-expressions
        result.status === 200 && downloadFile(data, id);
        // eslint-disable-next-line no-empty
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    [dynamicProps, id],
  );

  return (
    <Wrapper>
      {TYPES.map((type) => {
        // eslint-disable-next-line
        const SizeIcon = require(`../assets/${type}.svg`).default;
        return (
          <ScreenLink key={type} $isLoading={isLoading} onClick={() => handleDownload(type)}>
            <SizeIcon />
          </ScreenLink>
        );
      })}
    </Wrapper>
  );
};

export default ScreenOptions;
