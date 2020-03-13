import React from 'react';
import styled from 'styled-components';
import BaseBarChart from '../src/BarChart';
import Layout from './Layout';

const Text = styled.div`
  font-family: Arial;
`;

const StyledBarChart = styled(BaseBarChart)`
  > table {
    @media (max-width: 600px) {
      margin: 0 auto;
    }
  }
`;

const BarChart = ({ color, height, values }) => (
  <Layout>
    <Text>Bar Chart</Text>

    <StyledBarChart color={color} height={height} values={values} />
  </Layout>
);

BarChart.displayName = 'Bar Chart';

BarChart.dynamicProps = {
  color: '#17a2b8',
  height: 200,
  values: [
    { value: 50, label: 'Test1' },
    { value: 30, label: 'Test2' },
    { value: 20, label: 'Test3' },
    { value: 2, label: 'Test4' },
  ],
};

export default BarChart;
