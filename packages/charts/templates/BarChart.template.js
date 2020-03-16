import React from 'react';
import styled from 'styled-components';
import BaseBarChart from '../src/BarChart';
import Layout from './Layout';

const Text = styled.div`
  font-family: Arial;
`;

const StyledBarChart = styled(BaseBarChart)`
  margin: 0 auto;
`;

const BarChart = ({ height, legend, categories, series }) => (
  <Layout>
    <Text>Bar Chart</Text>

    <StyledBarChart series={series} categories={categories} height={height} legend={legend} />
  </Layout>
);

BarChart.displayName = 'Bar Chart';

BarChart.dynamicProps = {
  height: 300,
  legend: false,
  categories: [{ label: 'One Week', color: '#17a2b8' }],
  series: [
    {
      label: 'Test1',
      value: 53,
    },
    {
      label: 'Test2',
      value: 13,
    },
    {
      label: 'Test3',
      value: 26,
    },
    {
      label: 'Test4',
      value: 43,
    },
  ],
};

export default BarChart;
