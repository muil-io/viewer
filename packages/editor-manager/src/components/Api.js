import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import CopyIcon from '../assets/copy.svg';

const Wrapper = styled.div`
  padding: 20px;
  background: #fff;
  margin-top: -10px;
  height: calc(100% - 100px);

  .ace-tm {
    background: #f8f8f8;
    border: 1px solid #cccccc;
    border-radius: 5px;
    transition: border-color 200ms;
  }
`;

const Title = styled.div`
  color: #adadad;
  margin-bottom: 8px;
  font-size: 14px;
`;

const InputRow = styled.div`
  position: relative;
`;

const Method = styled.div`
  color: green;
  font-weight: bold;
  position: absolute;
  left: 6px;
  top: 11px;
  font-size: 11px;
`;

const Input = styled.input.attrs(() => ({ readOnly: true }))`
  border: 1px solid #cccccc;
  color: #424242;
  padding: 10px 39px;
  border-radius: 5px;
  width: 100%;
  background: #f8f8f8;
  margin-bottom: 15px;
  outline: none;
  transition: border-color 200ms;
`;

const CopyButton = styled(CopyIcon)`
  position: absolute;
  right: 8px;
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
  const url = `https://us-central1-muil-io.cloudfunctions.net/templates/test/${id}/email`;

  return (
    <Wrapper>
      <Title>Request Name</Title>

      <InputRow>
        <Method>POST</Method>
        <Input value={url} />
        <CopyButton onClick={() => navigator.clipboard.writeText(url)} />
      </InputRow>

      <Title>Request Body</Title>

      <AceEditor
        mode="json"
        height="inherit"
        width="100%"
        theme="textmate"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        value={JSON.stringify({ subject: 'Test Subject', to: 'test@test.com', props: dynamicProps }, null, 4)}
        setOptions={{ useWorker: false }}
        readOnly
        highlightActiveLine={false}
      />
    </Wrapper>
  );
};

export default Api;
