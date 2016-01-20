let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  console.log("Platform environment: " + process.env.NODE_ENV);
  console.log("Mail setup: " + process.env.MAIL_URL);
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {};

var _generateAccounts = () => Modules.server.generateAccounts();

Modules.server.startup = startup;
