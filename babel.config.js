// Replaces `import.meta` with a plain object literal.
// Metro emits classic (non-ESM) bundles for web, so any dependency that ships
// `import.meta` (e.g. zustand's ESM build) throws
// "Cannot use 'import.meta' outside a module" and blanks the page.
const transformImportMeta = ({ types: t }) => ({
  visitor: {
    MetaProperty(path) {
      const { meta, property } = path.node;
      if (meta.name !== 'import' || property.name !== 'meta') {
        return;
      }
      path.replaceWith(
        t.objectExpression([
          t.objectProperty(
            t.identifier('env'),
            t.objectExpression([
              t.objectProperty(
                t.identifier('MODE'),
                t.stringLiteral(process.env.NODE_ENV || 'production')
              ),
            ])
          ),
        ])
      );
    },
  },
});

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [transformImportMeta],
  };
};
