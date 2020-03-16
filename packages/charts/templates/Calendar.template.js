import React from 'react';
import styled from 'styled-components';
import BaseCalendar from '../src/Calendar';
import Layout from './Layout';

const Text = styled.div`
  font-family: Arial;
`;

const StyledCalendar = styled(BaseCalendar)`
  text-align: center;
`;

const Calendar = ({ monthsBefore, scores, colors }) => (
  <Layout>
    <Text>Calendar</Text>

    <StyledCalendar monthsBefore={monthsBefore} scores={scores} colors={colors} />
  </Layout>
);

Calendar.displayName = 'Calendar';

Calendar.dynamicProps = {
  monthsBefore: 3,
  scores: {
    '1/3/2020': 4,
    '2/3/2020': 14,
    '3/3/2020': 54,
    '4/3/2020': 34,
    '5/3/2020': 24,
    '6/3/2020': 4,
    '7/3/2020': 4,
    '8/3/2020': 4,
    '9/3/2020': 74,
    '10/3/2020': 24,
  },
  colors: [
    { range: [0, 10], color: '#fae5cf' },
    { range: [10, 20], color: '#f8bf92' },
    { range: [20, 30], color: '#fa9453' },
    { range: [30, 100], color: '#f75500' },
  ],
};

export default Calendar;
