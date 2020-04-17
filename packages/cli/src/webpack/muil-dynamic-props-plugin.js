/* eslint-disable class-methods-use-this */

const fs = require('fs');

const files = [];

class DynamicPropsPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('DynamicPropsPlugin', factory => {
      factory.hooks.parser.for('javascript/auto').tap('DynamicPropsPlugin', parser => {
        parser.hooks.program.tap('DynamicPropsPlugin', exp => {
          const {
            module: { resource },
          } = parser.state;
          if (!resource.endsWith('.template.js')) return;

          const dynamicPropsExpression = exp.body.find(
            ({ type, expression }) =>
              type === 'ExpressionStatement' &&
              expression.left &&
              expression.left.property &&
              expression.left.property.name === 'dynamicProps',
          );

          const displayNameExpression = exp.body.find(
            ({ type, expression }) =>
              type === 'ExpressionStatement' &&
              expression.left &&
              expression.left.property &&
              expression.left.property.name === 'displayName',
          );

          const { properties = [] } = (dynamicPropsExpression && dynamicPropsExpression.expression.right) || {};
          const dynamicProps = {};
          properties.forEach(p => {
            dynamicProps[p.key.name] = p.value.value;
          });

          const displayName = displayNameExpression && displayNameExpression.expression.right.value;

          const filename = /[^/|^\\]*$/.exec(resource)[0].replace('template.js', 'json');
          files.push({
            path: `${compiler.options.output.path}/${filename}`,
            data: JSON.stringify({ dynamicProps, displayName }),
          });
        });
      });
    });

    compiler.hooks.done.tap('DynamicPropsPlugin', () => {
      files.forEach(({ path, data }) => fs.writeFileSync(path, data));
    });
  }
}

module.exports = DynamicPropsPlugin;
