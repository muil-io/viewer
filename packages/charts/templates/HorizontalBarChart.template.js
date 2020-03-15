import React from 'react';
import styled from 'styled-components';
import BaseHorizontalBarChart from '../src/HorizontalBarChart';
import Layout from './Layout';

const Text = styled.div`
  font-family: Arial;
`;

const StyledHorizontalBarChart = styled(BaseHorizontalBarChart)`
  margin: 0 auto;
`;

const BarChart = ({ color, width, values }) => (
  <Layout>
    <Text>Horizontal Bar Chart</Text>

    <StyledHorizontalBarChart color={color} width={width} values={values} />
  </Layout>
);

BarChart.displayName = 'Horizontal Bar Chart';

BarChart.dynamicProps = {
  color: '#17a2b8',
  width: 400,
  values: [
    { value: 50, label: 'Test1' },
    { value: 30, label: 'Test2' },
    { value: 20, label: 'Test3' },
    { value: 2, label: 'Test4' },
  ],
};

export default BarChart;
