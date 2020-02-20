import React, { useEffect, useState } from 'react';

const Template3 = () => {
  const [myState, setMyState] = useState('Shahaf');

  useEffect(() => {
    setMyState('Nir');
  }, []);

  return <div>{`Template use JS ${myState}`}</div>;
};

Template3.displayName = 'Template use JS';

export default Template3;
