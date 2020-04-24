import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
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
  const { Template, dynamicProps, error } = useMemo(
    () => getTemplateFromUrl({ search: window.location.search, templates }),
    [],
  );

  if (error) {
    throw error;
  }

  if (!Template) {
    return <div className="no-templates">No Templates</div>;
  }

  const html = renderToStaticMarkup(<Template {...dynamicProps} />);

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const rootElement = document.getElementById('inner-root');
ReactDOM.render(<App />, rootElement);

if (module.hot) {
  module.hot.accept(err => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
  });
}
