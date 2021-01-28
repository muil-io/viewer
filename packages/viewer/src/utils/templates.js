export const getTemplateFromUrl = ({ search, templates }) => {
  const [templateStr] = search.slice(1).split('&');
  if (!templateStr) {
    return {};
  }

  const [, templateId] = templateStr.split('=');

  if (!templateId || !templates[templateId]) {
    return {};
  }

  const template = templates[templateId];

  return { templateId, Template: template.Template, dynamicProps: template.dynamicProps, error: template.error };
};

export const getTemplatesForParent = (templates) =>
  Object.keys(templates).reduce(
    (prevTemplates, templateKey) => ({
      ...prevTemplates,
      [templateKey]: {
        id: templates[templateKey].id,
        name: templates[templateKey].name,
        dynamicProps: templates[templateKey].dynamicProps,
      },
    }),
    {},
  );
