export default () => {
  try {
    const templateContext = require.context(process.env.templatesDirectory, true, /\.template\.(j|t)sx?$/);
    const templateFiles = templateContext.keys();

    return templateFiles.reduce((templates, templateFileName) => {
      const templateName = templateFileName.split('/');
      const templateId = templateName[templateName.length - 1].replace(/.template.(j|t)sx?/g, '').replace(/\.\//g, '');

      try {
        const Template = templateContext(templateFileName).default;
        return {
          ...templates,
          [templateId]: {
            id: templateId,
            name: Template?.displayName || templateFileName,
            Template,
            dynamicProps: Template?.dynamicProps,
          },
        };
      } catch (error) {
        return {
          ...templates,
          [templateId]: {
            id: templateId,
            name: templateFileName,
            error,
          },
        };
      }
    }, {});
  } catch {
    return {};
  }
};
