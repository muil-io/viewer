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
          if (dynamicPropsExpression) {
            const { properties } = dynamicPropsExpression.expression.right;

            const dynamicProps = {};
            properties.forEach(p => {
              dynamicProps[p.key.name] = p.value.value;
            });
            const filename = /[^/]*$/.exec(resource)[0].replace('template.js', 'json');
            files.push({ path: `${compiler.options.output.path}/${filename}`, data: JSON.stringify({ dynamicProps }) });
          }
        });
      });
    });

    compiler.hooks.done.tap('DynamicPropsPlugin', () => {
      files.forEach(({ path, data }) => fs.writeFileSync(path, data));
    });
  }
}

module.exports = DynamicPropsPlugin;
