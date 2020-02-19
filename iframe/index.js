import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import getTemplates from './utils/getTemplates';
import { getTemplateFromUrl, getTemplatesForParent } from './utils/templates';

const templates = getTemplates();
// eslint-disable-next-line no-restricted-globals
parent.postMessage(
  {
    templates: getTemplatesForParent(templates),
  },
  'http://localhost:8000/',
);

const App = () => {
  const { Template, dynamicProps } = useMemo(
    () => getTemplateFromUrl({ search: window.location.search, templates }),
    [],
  );

  if (!Template) {
    return <div>No Template Selected</div>;
  }

  return <Template {...dynamicProps} />;
};

const rootElement = document.getElementById('inner-root');
ReactDOM.render(<App />, rootElement);
