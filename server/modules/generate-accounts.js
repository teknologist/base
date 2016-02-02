let administrators = [{
    name: {
      first: 'The',
      last: 'Teknologist'
    },
    email: 'admin@teknologism.org',
    password: 'joshua'
  },

  {
    name: {
      first: 'Mathieu',
      last: 'Portet'
    },
    email: 'mathieu.portet@gmail.com',
    password: 'mathieuportet'
  }

];

let outletUsers = [{
    name: {
      first: 'Bernard',
      last: 'Pan'
    },
    email: 'eric@teknologism.org',
    password: 'okidoki'
  },

  {
    name: {
      first: 'Pomme',
      last: 'Adam'
    },
    email: 'teknologist@gmail.com',
    password: 'okidoki'
  }

];

let generateAccounts = () => {

  _createUsers(administrators);
  _createOutletUsers(outletUsers);
};

let _checkIfAccountsExist = (count) => {
  let userCount = Meteor.users.find().count();
  return userCount < count ? false : true;
};

let _createUsers = (users) => {
  for (let i = 0; i < users.length; i++) {
    let user = users[i],
      userExists = _checkIfUserExists(user.email);

    if (!userExists) {
      _createUser(user);
    }
  }
};


let _createOutletUsers = (users) => {
  for (let i = 0; i < users.length; i++) {
    let user = users[i],
      userExists = _checkIfUserExists(user.email);

    if (!userExists) {

      _createOutletUser(user);
    }
  }
};

let _checkIfUserExists = (email) => {
  return Meteor.users.findOne({
    'emails.address': email
  });
};

let _createUser = (user) => {
  let userId = Accounts.createUser({
    email: user.email,
    password: user.password,
    profile: {
      name: user.name
    }
  });

  Roles.addUsersToRoles(userId, 'admin');
};

let _createOutletUser = (user) => {
  let userId = Accounts.createUser({
    email: user.email,
    password: user.password,
    profile: {
      name: user.name
    }
  });

  Roles.addUsersToRoles(userId, 'outletOwner');
};

Modules.server.generateAccounts = generateAccounts;
