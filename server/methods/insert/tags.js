Meteor.methods({
  createTag(name, description, synonyms) {
      check(name, String);
      check(description, String);
      check(synonyms, Array);
      let isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      if (isAdmin) {
        return Tags.insert({
          name: name,
          description: description,
          synonyms: synonyms
        });


      } else {
        throw new Meteor.Error('unauthorized',
          'Sorry, you do not have the rights to create a Tag.'
        );
      }

    },
    submitTag(tag) {
      check(tag, Object);
      let isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      if (isAdmin) {
        return Tags.insert(tag);


      } else {
        throw new Meteor.Error('unauthorized',
          'Sorry, you do not have the rights to create a Tag.'
        );
      }

    }
});
