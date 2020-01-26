const templateContext = require.context(`../templates`, true, /\.js$/);

const getTemplates = () => {
  const templateFiles = templateContext.keys();
  return templateFiles.reduce((templates, templateFileName) => {
    const templateId = templateFileName.replace(/.js/g, '').replace(/\.\//g, '');
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

export default getTemplates;
