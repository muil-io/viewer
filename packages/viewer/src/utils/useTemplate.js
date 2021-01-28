import { useCallback, useEffect, useMemo, useState } from 'react';
import { getTemplateFromUrl } from './templates';

// saving locally to keep data with HMR
let dynamicPropsRef;

// This hooks receives templates and selecting the template by url and getting dynamic props from post-message
const useTemplate = (templates) => {
  const { templateId, dynamicProps: defaultDynamicProps, error } = useMemo(
    () => getTemplateFromUrl({ search: window.location.search, templates }),
    [templates],
  );

  const [dynamicProps, setDynamicProps] = useState(dynamicPropsRef || defaultDynamicProps);

  const handleReceiveMessage = useCallback(({ data }) => {
    if (data.dynamicProps) {
      setDynamicProps(data?.dynamicProps);
      dynamicPropsRef = data?.dynamicProps;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    window.addEventListener('message', handleReceiveMessage);
    // eslint-disable-next-line no-restricted-globals
    return () => window.removeEventListener('message', handleReceiveMessage);
  }, [handleReceiveMessage]);

  return { templateId, dynamicProps, error };
};

export default useTemplate;
