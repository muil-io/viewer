import React from 'react';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-coy.css';
import { HEADER_HEIGHT } from '../constants';
import CopyIcon from '../assets/copy.svg';
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

const Title = styled.div`
  color: #adadad;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 300;
`;

const InputRow = styled.div`
  position: relative;
`;

const Method = styled.div`
  color: green;
  font-weight: bold;
  position: absolute;
  left: 6px;
  top: 12px;
  font-size: 11px;
`;

const Input = styled.input.attrs(() => ({ readOnly: true }))`
  border: 1px solid #cccccc;
  color: #424242;
  padding: 10px 27px 10px 39px;
  border-radius: 5px;
  width: 100%;
  background: #f8f8f8;
  margin-bottom: 18px;
  outline: none;
  transition: border-color 200ms;
`;

const CopyButton = styled(CopyIcon)`
  position: absolute;
  right: 5px;
  top: 7px;
  cursor: pointer;

  > path {
    transition: 200ms;
    fill: #cccccc;
  }

  &:hover {
    > path {
      fill: #6735e0;
    }
  }
`;

const Api = ({ dynamicProps, id }) => {
  const url = `https://us-central1-muil-io.cloudfunctions.net/templates/${id}/email`;

  return (
    <Wrapper>
      <Title>Request Name</Title>

      <InputRow>
        <Method>POST</Method>
        <Input value={url} />
        <CopyButton onClick={() => navigator.clipboard.writeText(url)} />
      </InputRow>

      <Title>Request Body</Title>

      <Editor
        value={JSON.stringify({ subject: 'Test Subject', to: 'test@test.com', props: dynamicProps }, null, 4)}
        highlight={code => highlight(code, languages.json)}
        className="container__editor"
      />
    </Wrapper>
  );
};

export default Api;
