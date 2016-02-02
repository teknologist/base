Meteor.publish('outlets', function() {
  return Outlets.find({}, {
    sort: {
      'createdAt': -1
    }
  });

});
