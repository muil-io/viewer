import { useState, useCallback, useEffect } from 'react';

const useTemplates = () => {
  const [defaultTemplates, setDefaultTemplates] = useState({});

  const handleReceiveMessage = useCallback(
    ({ data }) => {
      if (data?.templates && !Object.keys(defaultTemplates).length) {
        setDefaultTemplates(data.templates);
      }
    },
    [defaultTemplates],
  );

  useEffect(() => {
    window.addEventListener('message', handleReceiveMessage);
    return () => window.removeEventListener('message', handleReceiveMessage);
  }, [handleReceiveMessage]);

  return defaultTemplates;
};

export default useTemplates;
