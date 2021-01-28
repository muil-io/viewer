import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import getTemplates from './utils/getTemplates';
import { getTemplatesForParent } from './utils/templates';
import useTemplate from './utils/useTemplate';

// Get templates from context (id, name, default dynamicProps)
const templates = getTemplates();
// Send templates to parent
// eslint-disable-next-line no-restricted-globals
parent.postMessage({ templates: getTemplatesForParent(templates) }, '*');

const App = () => {
  const [html, setHtml] = useState('');
  const { templateId, Template, dynamicProps, error } = useTemplate(templates);

  const renderHtml = useCallback(async () => {
    const result = await fetch('/api/renderTemplate', {
      method: 'post',
      body: JSON.stringify({ id: templateId, props: dynamicProps, type: 'html' }),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', responseType: 'blob' },
    });
    const data = await result.text();
    setHtml(data);
  }, [dynamicProps, templateId]);

  useEffect(() => {
    if (templateId) {
      renderHtml();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId, dynamicProps]);

  if (error) {
    throw error;
  }

  if (!templateId) {
    return <div className="no-templates">No Templates</div>;
  }

  if (html) {
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  if (Template) {
    return <Template {...dynamicProps} />;
  }

  return null;
};

const rootElement = document.getElementById('inner-root');
ReactDOM.render(<App />, rootElement);

if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
  });
}
