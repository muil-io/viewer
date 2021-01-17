import React, { useCallback } from 'react';
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
`;

const BASE_API = '/api/renderTemplate';

const Api = ({ id, dynamicProps }) => {
  const handleDownload = useCallback(
    async (selectedType) => {
      try {
        const data = await fetch(BASE_API, {
          method: 'post',
          body: JSON.stringify({ id, props: dynamicProps, type: selectedType }),
          headers: { Accept: 'application/json', 'Content-Type': 'application/json', responseType: 'blob' },
        });

        const output = await data.blob();
        downloadFile(output, id);
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    [dynamicProps, id],
  );

  return (
    <Wrapper>
      <Button onClick={() => handleDownload('pdf')}>Download PDF</Button>
      <Button onClick={() => handleDownload('png')}>Download Image</Button>
      <Button onClick={() => handleDownload('html')}>Download HTML</Button>
    </Wrapper>
  );
};

export default Api;
