Meteor.publish('tags', function() {
  return Tags.find({}, {
    sort: {
      'createdAt': -1
    },
    fields: {
      'name': 1,
      'description': 1,
      'synonyms': 1
    }
  });

});
