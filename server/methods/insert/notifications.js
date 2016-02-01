Meteor.methods({
  testNotification(email, title, content) {
    check(email, String);
    check(title, String);
    check(content, String);

    let destinationUser = Accounts.findUserByEmail(email);

    if (destinationUser) {
      return Notifications.insert({
        userId: destinationUser._id,
        title: title,
        content: content
      });
    } else {
      throw new Meteor.Error('noSuchUser',
        'Sorry, it looks like that user does not exist :)'
      );
    }
  }
});
