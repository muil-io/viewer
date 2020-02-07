import React, { useCallback } from 'react';
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

const DynamicProps = ({ dynamicProps = {}, onChangeKnob }) => {
  const handleChangeValue = useCallback(
    value => {
      try {
        const parsedValue = JSON.parse(value);
        onChangeKnob(parsedValue);
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    [onChangeKnob],
  );

  return (
    <Wrapper>
      <AceEditor
        mode="json"
        height="inherit"
        width="100%"
        theme="textmate"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        value={JSON.stringify(dynamicProps, null, 4)}
        onChange={handleChangeValue}
        setOptions={{ useWorker: false }}
      />
    </Wrapper>
  );
};

export default DynamicProps;
