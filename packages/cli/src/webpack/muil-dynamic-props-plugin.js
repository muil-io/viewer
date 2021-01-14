/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

const fs = require('fs');

const files = [];

const readDynamicProperties = (properties, result) => {
  properties.forEach((p) => {
    if (p.value.type === 'ObjectExpression') {
      result[p.key.name] = {};
      readDynamicProperties(p.value.properties, result[p.key.name]);
    } else if (p.value.type === 'ArrayExpression') {
      result[p.key.name] = [];
      p.value.elements.forEach((item, index) => {
        if (item.type === 'ObjectExpression') {
          result[p.key.name][index] = {};
          readDynamicProperties(item.properties, result[p.key.name][index]);
        } else {
          result[p.key.name][index] = item.value;
        }
      });
    } else {
      result[p.key.name] = p.value.value;
    }
  });
};

class DynamicPropsPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('DynamicPropsPlugin', (factory) => {
      factory.hooks.parser.for('javascript/auto').tap('DynamicPropsPlugin', (parser) => {
        parser.hooks.program.tap('DynamicPropsPlugin', (exp) => {
          const {
            module: { resource },
          } = parser.state;

          const match = resource.match(/\.template\.(j|t)sx?$/);
          if (!match) return;

          // extracting dynamicProps
          const dynamicProps = {};
          let properties = [];
          const dynamicPropsExpression = exp.body.find(
            ({ type, expression }) =>
              type === 'ExpressionStatement' &&
              expression.left &&
              expression.left.property &&
              expression.left.property.name === 'dynamicProps',
          );
          if (dynamicPropsExpression) {
            properties = (dynamicPropsExpression && dynamicPropsExpression.expression.right.properties) || [];
            readDynamicProperties(properties, dynamicProps);
          } else {
            const staticDynamicPropsExpression = exp.body.find(
              ({ type, expression }) =>
                type === 'ExpressionStatement' &&
                expression.arguments &&
                expression.arguments[1] &&
                expression.arguments[1].value === 'dynamicProps',
            );
            properties =
              (staticDynamicPropsExpression && staticDynamicPropsExpression.expression.arguments[2].properties) || [];
            readDynamicProperties(properties, dynamicProps);
          }

          // extracting displayName
          let displayName;
          const displayNameExpression = exp.body.find(
            ({ type, expression }) =>
              type === 'ExpressionStatement' &&
              expression.left &&
              expression.left.property &&
              expression.left.property.name === 'displayName',
          );
          if (displayNameExpression) {
            displayName = displayNameExpression.expression.right.value;
          } else {
            const staticDisplayNameExpression = exp.body.find(
              ({ type, expression }) =>
                type === 'ExpressionStatement' &&
                expression.arguments &&
                expression.arguments[1] &&
                expression.arguments[1].value === 'displayName',
            );
            if (staticDisplayNameExpression) {
              displayName = staticDisplayNameExpression.expression.arguments[2].value;
            }
          }

          const filename = /[^/|^\\]*$/
            .exec(resource)[0]
            .replace(/\.template\.(j|t)sx?$/, '.json')
            .toLowerCase();
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
