import { NOT_ALLOWED_HTML_TAGS, USE_WITH_CAUTION_CSS_PROPERTIES } from '../constants';

const cleanHtml = html => {
  const tagsPatterns = NOT_ALLOWED_HTML_TAGS.map(
    tag => `<${tag}[\\s\\S]*>[\\s\\S]*<\\/${tag}>|<${tag} [\\s\\S]*\\/>`,
  ).join('|');

  const tagsRegex = new RegExp(tagsPatterns, 'gi');
  const newHtml = html.replace(tagsRegex, '');

  if (html !== newHtml) {
    console.warn(`The following html elements are not allowed and were cleared: ${NOT_ALLOWED_HTML_TAGS.join(', ')}.`);
  }

  return newHtml;
};

const getBlobURL = (code, type) => {
  const blob = new Blob([code], { type });
  return URL.createObjectURL(blob);
};

const getGeneratedPageURL = ({ html, css }) => {
  const cssURL = getBlobURL(css, 'text/css');

  const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        <style>body{margin:0; padding: 0}</style>
      </head>
      <body>
        ${cleanHtml(html || '')}
      </body>
    </html>
  `;

  return getBlobURL(source, 'text/html');
};

export default getGeneratedPageURL;
