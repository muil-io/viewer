import React, { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import getGeneratedPageURL from '../utils/iframe';

const useContent = ({ templates, templateId }) => {
  const template = useMemo(() => templates?.[templateId], [templateId, templates]);

  const url = useMemo(() => {
    if (!template) {
      return null;
    }

    const { Template, dynamicProps = {} } = template;

    const html = renderToStaticMarkup(<Template {...dynamicProps} />);

    const css = [...document.styleSheets]
      .slice(1)
      .map(stylesheet => {
        try {
          const { rules } = stylesheet;
          return Object.keys(rules).reduce((prev, curr) => prev + rules[curr].cssText, '');
        } catch (err) {
          return '';
        }
      })
      .join('');

    return getGeneratedPageURL({
      html,
      css,
    });
  }, [template]);

  return url;
};

export default useContent;
