export default () => {
  try {
    const templateContext = require.context(process.env.templatesDirectory, true, /\.template\.js$/);
    const templateFiles = templateContext.keys();

    return templateFiles.reduce((templates, templateFileName) => {
      const templateName = templateFileName.split('/');
      const templateId = templateName[templateName.length - 1].replace(/.template.js/g, '').replace(/\.\//g, '');
      const Template = templateContext(templateFileName).default;
      return {
        ...templates,
        [templateId]: {
          name: Template.displayName || templateFileName,
          Template,
          dynamicProps: Template.dynamicProps,
        },
      };
    }, {});
  } catch {
    return {};
  }
};
