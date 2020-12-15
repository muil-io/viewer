import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import getTemplates from './utils/getTemplates';
import { getTemplateFromUrl, getTemplatesForParent } from './utils/templates';

const templates = getTemplates();
// eslint-disable-next-line no-restricted-globals
parent.postMessage(
  {
    templates: getTemplatesForParent(templates),
  },
  '*',
);

const App = () => {
  const { Template, dynamicProps: defaultDynamicProps, error } = useMemo(
    () => getTemplateFromUrl({ search: window.location.search, templates }),
    [],
  );

  const [dynamicProps, setDynamicProps] = useState(defaultDynamicProps);

  const handleReceiveMessage = useCallback(({ data }) => data.dynamicProps && setDynamicProps(data?.dynamicProps), []);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    window.addEventListener('message', handleReceiveMessage);
    // eslint-disable-next-line no-restricted-globals
    return () => window.removeEventListener('message', handleReceiveMessage);
  }, [handleReceiveMessage]);

  if (error) {
    throw error;
  }

  if (!Template) {
    return <div className="no-templates">No Templates</div>;
  }

  // SSR and createGlobalStyle doesn't play well togther since styled-components v5.2, we need to figure out how to handle this
  // https://github.com/styled-components/styled-components/blob/71c0fb8bc9eb2c40b0a7d78d67132f7d6ca3aee0/packages/styled-components/src/constructors/createGlobalStyle.js#L54
  // const html = renderToString(<Template {...dynamicProps} />);
  //
  // eslint-disable-next-line react/no-danger
  // return <div dangerouslySetInnerHTML={{ __html: html }} />;

  return <Template {...dynamicProps} />;
};

const rootElement = document.getElementById('inner-root');
ReactDOM.render(<App />, rootElement);
