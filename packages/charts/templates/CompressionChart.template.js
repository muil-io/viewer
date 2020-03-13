import React from 'react';
import styled from 'styled-components';
import BaseCompressionChart from '../src/CompressionChart';
import Layout from './Layout';

const Text = styled.div`
  font-family: Arial;
`;

const StyledCompressionChart = styled(BaseCompressionChart)`
  > table {
    margin: 0 auto;
  }
`;

const CompressionChart = ({ color1, color2, height, values }) => (
  <Layout>
    <Text>Compression Chart</Text>

    <StyledCompressionChart color1={color1} color2={color2} height={height} values={values} />
  </Layout>
);

CompressionChart.displayName = 'Compression Chart';

CompressionChart.dynamicProps = {
  color1: '#17a2b8',
  color2: '#d5d5d4',
  height: 200,
  values: [
    { value1: 50, value2: 40, label: 'Test1' },
    { value1: 20, value2: 50, label: 'Test2' },
    { value1: 10, value2: 40, label: 'Test3' },
  ],
};

export default CompressionChart;
