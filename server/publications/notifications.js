Meteor.publish('notifications', function() {
  return Notifications.find({
    'userId': this.userId
  }, {
    sort: {
      'createdAt': -1
    },
    fields: {
      'title': 1,
      'content': 1,
      'createdAt': 1,
      'userId': 1,
      'creatorID': 1,
      'readStatus': 1,
      'readAt': 1,
      'snacked': 1,
      'snackedAt': 1
    }
  });

});
