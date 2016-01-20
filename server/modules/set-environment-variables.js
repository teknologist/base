let setEnvironmentVariables = () => {

  smtp = {
    username: "92851e6d-25d0-4314-9b12-c36806b66488",
    password: "92851e6d-25d0-4314-9b12-c36806b66488",
    server: "smtp.elasticemail.com",
    port: 2525
  };



  process.env.MAIL_URL = "smtp://" + encodeURIComponent(smtp.username) +
    ":" + encodeURIComponent(smtp.password) + "@" + encodeURIComponent(smtp
      .server) + ":" + smtp.port;


  if (Meteor.settings.private) {
    process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
  }
};

Modules.server.setEnvironmentVariables = setEnvironmentVariables;
