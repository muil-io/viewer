const templateContext = require.context(process.env.rootDirectory, true, /^((?!node_modules).)*\.template\.js$/);

export default () => {
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
        knobs: Template.knobs,
      },
    };
  }, {});
};
