let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _generateTags();
  console.log("Platform environment: " + process.env.NODE_ENV);
  console.log("Mail setup: " + process.env.MAIL_URL);
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {
  BrowserPolicy.content.allowImageOrigin("http://media.giphy.com");
  BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
  BrowserPolicy.content.allowEval('https://ajax.googleapis.com');
  BrowserPolicy.content.allowFontDataUrl();
};

var _generateAccounts = () => Modules.server.generateAccounts();
var _generateTags = () => Modules.server.generateTags();

Modules.server.startup = startup;
