import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import downloadFile from '../utils/downloadFile';
import DownloadIcon from '../assets/download.svg';
import Toaster from './Toaster';

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

const TYPES = ['html', 'pdf', 'png'];
const BASE_API = '/api/renderTemplate';

const ScreenOptions = ({ selectedTemplate }) => {
  const { id, dynamicProps } = selectedTemplate || {};

  const [isLoading, setIsLoading] = useState(false);
  const [toasterError, setToasterError] = useState();

  const handleDownload = useCallback(
    async (selectedType) => {
      try {
        setIsLoading(true);
        const result = await fetch(BASE_API, {
          method: 'post',
          body: JSON.stringify({ id, props: dynamicProps, type: selectedType }),
          headers: { Accept: 'application/json', 'Content-Type': 'application/json', responseType: 'blob' },
        });

        if (result.status === 200) {
          const data = await result.blob();
          downloadFile(data, id);
        } else {
          const error = await result.json();
          setToasterError(error?.error);
        }
      } catch (err) {
        setToasterError('Error');
      } finally {
        setIsLoading(false);
      }
    },
    [dynamicProps, id],
  );

  return (
    <>
      <Wrapper>
        {TYPES.map((type) => (
          <Button key={type} disabled={isLoading} onClick={() => handleDownload(type)}>
            {type.toUpperCase()}
            <DownloadIcon />
          </Button>
        ))}
      </Wrapper>

      {toasterError && <Toaster text={toasterError} onClose={() => setToasterError()} />}
    </>
  );
};

export default ScreenOptions;
