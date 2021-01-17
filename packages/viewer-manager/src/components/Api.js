import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import downloadFile from '../utils/downloadFile';

const Wrapper = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 14px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 10px 0px;

  &:disabled {
    background: ${({ theme }) => theme.colors.gray2};
    cursor: no-drop;
  }
`;

const BASE_API = '/api/renderTemplate';

const Api = ({ id, dynamicProps }) => {
  const [isLoadingType, setIsLoading] = useState();

  const handleDownload = useCallback(
    async (selectedType) => {
      try {
        setIsLoading(selectedType);
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
        setIsLoading();
      }
    },
    [dynamicProps, id],
  );

  return (
    <Wrapper>
      <Button disabled={isLoadingType} onClick={() => handleDownload('pdf')}>
        {isLoadingType === 'pdf' ? 'Downloading PDF...' : 'Download PDF'}
      </Button>
      <Button disabled={isLoadingType} onClick={() => handleDownload('png')}>
        {isLoadingType === 'png' ? 'Downloading Image...' : 'Download Image'}
      </Button>
      <Button disabled={isLoadingType} onClick={() => handleDownload('html')}>
        {isLoadingType === 'html' ? 'Downloading HTML...' : 'Download HTML'}
      </Button>
    </Wrapper>
  );
};

export default Api;
