import { useCallback, useEffect, useMemo, useState } from 'react';
import { getTemplateFromUrl } from './templates';

// This hooks receives templates and selecting the template by url and getting dynamic props from post-message
const useTemplate = (templates) => {
  const { Template, dynamicProps: defaultDynamicProps, error } = useMemo(
    () => getTemplateFromUrl({ search: window.location.search, templates }),
    [templates],
  );

  const [dynamicProps, setDynamicProps] = useState(defaultDynamicProps);

  const handleReceiveMessage = useCallback(({ data }) => data.dynamicProps && setDynamicProps(data?.dynamicProps), []);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    window.addEventListener('message', handleReceiveMessage);
    // eslint-disable-next-line no-restricted-globals
    return () => window.removeEventListener('message', handleReceiveMessage);
  }, [handleReceiveMessage]);

  return { Template, dynamicProps, error };
};

export default useTemplate;
