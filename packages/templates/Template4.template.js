import React from 'react';

const Template4 = ({ isActive, user, years, person }) => (
  <div>
    <div>{`Hello ${user}`}</div>

    {user.length > 0 ? (
      <>
        <div>Are you active?</div>
        {isActive ? 'Active!' : 'Not active!'}
      </>
    ) : (
      <div>No Name</div>
    )}

    <div>
      {years.map(year => (
        <div key={year}>{year}</div>
      ))}
    </div>

    <div>{`${person.firstName} ${person.lastName}`}</div>
  </div>
);

Template4.displayName = 'Template with Dynamic Props';

Template4.dynamicProps = {
  user: 'username',
  person: { firstName: 'Nir', lastName: 'Test' },
  isActive: true,
  years: [2018, 2019, 2020],
  person1: { firstName: 'Nir', lastName: 'Test' },
  person2: { firstName: 'Nir', lastName: 'Test' },
  person3: { firstName: 'Nir', lastName: 'Test' },
};

export default Template4;
