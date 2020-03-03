import React, { useCallback } from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
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
  ${scrollbar};

  .ace-tm {
    background: #f8f8f8;
    border: 1px solid #cccccc;
    border-radius: 5px;
    transition: border-color 200ms;
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
          maxLines={Infinity}
          width="100%"
          theme="textmate"
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          showGutter={false}
          value={JSON.stringify(dynamicProps, null, 4)}
          onChange={handleChangeValue}
          setOptions={{ useWorker: false }}
          wrapEnabled
        />
      ) : (
        <EmptyState>No Dynamic props defined</EmptyState>
      )}
    </Wrapper>
  );
};

export default DynamicProps;
