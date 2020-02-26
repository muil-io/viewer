import { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import isEqual from 'lodash.isequal';

const useTemplates = () => {
  const [defaultTemplates, setDefaultTemplates] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const handleReceiveMessage = useCallback(
    ({ data }) => {
      if (!isEqual(defaultTemplates, data.templates)) {
        setDefaultTemplates(data.templates);

        if (location.pathname === '/') {
          history.push(Object.values(data.templates)?.[0]?.id || '/');
        }
      }
    },
    [defaultTemplates, history, location],
  );

  useEffect(() => {
    window.addEventListener('message', handleReceiveMessage);
    return () => window.removeEventListener('message', handleReceiveMessage);
  }, [handleReceiveMessage]);

  return defaultTemplates;
};

export default useTemplates;
