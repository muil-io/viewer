import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';

const Wrapper = styled.div`
  height: calc(100% - 100px);
  .ace-tm {
    background-color: transparent;
  }
`;

const Title = styled.div`
  margin: 0 10px;
  display: flex;

  > span {
    &:first-child {
      color: green;
      font-weight: bold;
      margin-right: 10px;
      margin-top: 2px;
    }

    &:last-child {
      color: #4688ff;
      word-break: break-word;
    }
  }
`;

const Api = ({ dynamicProps, id }) => (
  <Wrapper>
    <Title>
      <span>POST</span>
      <span>{`https://us-central1-muil-io.cloudfunctions.net/templates/test/${id}/email`}</span>
    </Title>

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

export default Api;
