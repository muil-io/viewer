import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import isEqual from 'lodash.isequal';

const useTemplates = () => {
  const [defaultTemplates, setDefaultTemplates] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleReceiveMessage = useCallback(
    ({ data }) => {
      if (data.templates && !isEqual(defaultTemplates, data.templates)) {
        setDefaultTemplates(data.templates);

        if (location.pathname === '/') {
          navigate(`/${Object.values(data.templates)?.[0]?.id || ''}`);
        }
      }
    },
    [defaultTemplates, navigate, location],
  );

  useEffect(() => {
    window.addEventListener('message', handleReceiveMessage);
    return () => window.removeEventListener('message', handleReceiveMessage);
  }, [handleReceiveMessage]);

  return defaultTemplates;
};

export default useTemplates;
