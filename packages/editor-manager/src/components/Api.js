import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import CopyIcon from '../assets/copy.svg';

const Wrapper = styled.div`
  height: calc(100% - 120px);
  .ace-tm {
    background-color: transparent;
  }
`;

const CopyButton = styled(CopyIcon)`
  position: absolute;
  right: 20px;
  top: 26px;
  cursor: pointer;
  display: none;
`;

const Head = styled.div`
  position: relative;
  padding: 29px 20px;
  margin: -10px 0 10px 0;
  background: #fff;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);

  > div {
    &:first-child {
      color: green;
      font-weight: bold;
      margin-bottom: 8px;
    }

    &:last-child {
      color: #4688ff;
      word-break: break-word;
    }
  }

  &:hover {
    ${CopyButton} {
      display: block;
    }
  }
`;

const Api = ({ dynamicProps, id }) => {
  const url = `https://us-central1-muil-io.cloudfunctions.net/templates/test/${id}/email`;

  return (
    <Wrapper>
      <Head>
        <div>POST</div>
        <CopyButton onClick={() => navigator.clipboard.writeText(url)} />
        <div>{url}</div>
      </Head>

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
