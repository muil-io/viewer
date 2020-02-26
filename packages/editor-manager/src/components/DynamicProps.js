import React, { useCallback } from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import EmptyState from './EmptyState';

const Wrapper = styled.div`
  position: absolute;
  top: 90px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  .ace-tm {
    background-color: transparent;
  }
`;

const DynamicProps = ({ dynamicProps, onChangeKnob }) => {
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
      {dynamicProps ? (
        <AceEditor
          mode="json"
          height="100%"
          width="100%"
          theme="textmate"
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          showGutter={false}
          value={JSON.stringify(dynamicProps, null, 4)}
          onChange={handleChangeValue}
          setOptions={{ useWorker: false }}
        />
      ) : (
        <EmptyState>No Dynamic props defined</EmptyState>
      )}
    </Wrapper>
  );
};

export default DynamicProps;
