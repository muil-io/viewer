import React from 'react';
import styled from 'styled-components';
import get from 'lodash.get';

const Wrapper = styled.div`
  width: 100%;
  padding: 23px 15px 17px;
  border-bottom: 1px solid #676565;
  font-size: 13px;
  margin-bottom: 10px;
`;

const replaceWithProps = (knobs, prop = '') =>
  prop.replace(/{{.*}}/gi, placeholder => get(knobs.props, placeholder.replace(/{{(.*)}}/, '$1')));

const MailInfo = ({ knobs }) => (
  <Wrapper>
    <div>{`To: ${replaceWithProps(knobs, knobs?.to)}`}</div>
    <div>{`Subject: ${replaceWithProps(knobs, knobs?.subject)}`}</div>
  </Wrapper>
);

export default MailInfo;
