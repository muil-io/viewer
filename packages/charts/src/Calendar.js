import React from 'react';
import styled from 'styled-components';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Table = styled.table`
  border-spacing: 5px;
  display: inline-block;
  margin: 5px;
`;

const DateTitle = styled.th`
  font-size: 13px;
  padding: 10px 0;
`;

const Day = styled.td`
  font-size: 13px;
  color: #868686;
`;

const Cell = styled.td`
  width: 20px;
  height: 20px;
  text-align: center;
  font-size: 11px;
  color: #868686;
  ${({ empty, color }) => !empty && `background: ${color || '#e4e4e4'};`}
`;

const daysInMonth = (iMonth, iYear) => 32 - new Date(iYear, iMonth, 32).getDate();

const createMonth = (year, month) => {
  const calendar = [];
  const firstDay = new Date(year, month).getDay();

  let date = 1;
  new Array(6).fill('').forEach((x, i) => {
    const row = [];

    new Array(7).fill('').forEach((y, j) => {
      if (i === 0 && j < firstDay) {
        row.push({});
      } else if (date <= daysInMonth(month, year)) {
        row.push({ day: date, date: new Date(year, month, date) });
        // eslint-disable-next-line no-plusplus
        date++;
      }
    });

    calendar.push(row);
  });

  return calendar;
};

const subtractMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() - months);
  return d;
};

const formatTitle = date => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${MONTHS[month]} ${year}`;
};

const getColorByScore = (date, scores, colors) => {
  if (!date) {
    return;
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day}/${(month + 1) % 12}/${year}`;

  const score = scores[formattedDate];
  return colors.find(({ range }) => score >= range[0] && score <= range[1])?.color;
};

const Calendar = ({ className, monthsBefore = 1, showNumbers = false, scores = {}, colors = [] }) => {
  const calendars = new Array(monthsBefore).fill('').map((_, index) => {
    const date = subtractMonths(new Date(), monthsBefore - index - 1);
    return { month: date, calendar: createMonth(date.getFullYear(), date.getMonth()) };
  });

  return (
    <div className={className}>
      {calendars.map(({ month, calendar }, calendarIndex) => (
        <Table key={calendarIndex}>
          <thead>
            <tr>
              <DateTitle colSpan="7">{formatTitle(month)}</DateTitle>
            </tr>
          </thead>
          <thead>
            <tr>
              <Day>S</Day>
              <Day>M</Day>
              <Day>T</Day>
              <Day>W</Day>
              <Day>T</Day>
              <Day>F</Day>
              <Day>S</Day>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map(({ day, date }, dayIndex) => (
                  <Cell key={dayIndex} empty={!day} color={getColorByScore(date, scores, colors)}>
                    {showNumbers ? day : ''}
                  </Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ))}
    </div>
  );
};

export default Calendar;
