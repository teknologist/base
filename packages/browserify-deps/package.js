Package.describe({
  name: 'browserify-deps',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({  
  'react': '0.14.7',
  'material-ui':'0.14.4'
});



Package.onUse(function(api) {
  api.use(['cosmos:browserify@0.3.0'], 'client');
  api.addFiles(['client.browserify.js'], 'client');

  api.export('React', 'client');
  api.export('mui', 'client');
  api.export('injectTapEventPlugin', 'client');
});

