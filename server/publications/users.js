Meteor.publish('usersAdmin', function() {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({

    }, {
      sort: {
        'createdAt': -1
      },
      fields: {
        'emails': 1,
        'roles': 1,
        'createdAt': 1
      }
    });
  }


});
