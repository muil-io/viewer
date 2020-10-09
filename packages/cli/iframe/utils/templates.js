export const getTemplateFromUrl = ({ search, templates }) => {
  const [templateStr, dynamicPropsStr] = search.slice(1).split('&');
  if (!templateStr) {
    return {};
  }

  const [, templateId] = templateStr.split('=');
  const [, dynamicProps] = dynamicPropsStr.split('=');

  console.log(templateId);

  let parsedProps = null;
  try {
    parsedProps = JSON.parse(decodeURIComponent(dynamicProps));
  } catch (err) {
    parsedProps = null;
  }

  if (!templateId || !templates[templateId]) {
    return {};
  }

  const template = templates[templateId];

  return { Template: template.Template, dynamicProps: parsedProps || template.dynamicProps, error: template.error };
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
