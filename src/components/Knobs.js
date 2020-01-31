import React, { useCallback } from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';

const Wrapper = styled.div`
  height: 100%;
  .ace-twilight {
    background-color: transparent;
  }
`;

const Request = ({ knobs = {}, onChangeKnob }) => {
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
        theme="twilight"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        value={JSON.stringify(knobs, null, 4)}
        onChange={handleChangeValue}
      />
    </Wrapper>
  );
};

export default Request;
