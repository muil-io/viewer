import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-coy.css';
import { HEADER_HEIGHT } from '../constants';
import EmptyState from './EmptyState';
import scrollbar from '../style/scrollbar';

const Wrapper = styled.div`
  position: absolute;
  top: ${HEADER_HEIGHT}px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  padding: 20px;
  background: #fff;

  .container__editor {
    background: #f8f8f8;
    border: 1px solid #cccccc;
    border-radius: 5px;
    transition: border-color 200ms;
    overflow: auto !important;
    max-height: 100%;
    font-size: 12px;
    line-height: 16px;
    font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
    ${scrollbar};

    textarea {
      outline: none;
    }
  }
`;

const DynamicProps = ({ dynamicProps, onChangeKnob }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(JSON.stringify(dynamicProps || {}, null, 4));
  }, [dynamicProps]);

  const handleChangeValue = useCallback(
    code => {
      setValue(code);
      try {
        const parsedValue = JSON.parse(code);
        onChangeKnob(parsedValue);
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    [onChangeKnob],
  );

  return (
    <Wrapper>
      {dynamicProps ? (
        <Editor
          value={value || ''}
          onValueChange={handleChangeValue}
          highlight={code => highlight(code, languages.json)}
          className="container__editor"
        />
      ) : (
        <EmptyState>No Dynamic props defined</EmptyState>
      )}
    </Wrapper>
  );
};

export default DynamicProps;
