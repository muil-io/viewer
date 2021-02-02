import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import downloadFile from '../utils/downloadFile';
import DownloadIcon from '../assets/download.svg';

const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 7px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 13px;
  transition: 200ms;

  > svg {
    margin-left: 6px;
    width: 16px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${({ theme }) => theme.colors.gray2}!important;
      cursor: no-drop;
    `}
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
      {TYPES.map((type) => (
        <Button key={type} disabled={isLoading} onClick={() => handleDownload(type)}>
          {type.toUpperCase()}
          <DownloadIcon />
        </Button>
      ))}
    </Wrapper>
  );
};

export default ScreenOptions;
