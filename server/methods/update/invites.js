const urls = {
  development: 'http://localhost:3000/signup/',
  production: 'https://asteroid.teknologism.com/signup/'
};

Meteor.methods({
  sendInvite(inviteId) {
    check(inviteId, String);
    this.unblock();
    let invite = Invites.findOne({
      _id: inviteId
    });

    if (invite) {
      SSR.compileTemplate('inviteEmail', Assets.getText(
        'email/templates/invite.html'));

      Email.send({
        to: invite.email,
        from: 'Dandy Asteroid <no-reply@teknologism.com>',
        subject: 'You have been invited to Project Asteroid!',
        html: SSR.render('inviteEmail', {
          url: urls[process.env.NODE_ENV] + invite.token
        })
      });

      Invites.update(invite._id, {
        $set: {
          invited: true,
          dateInvited: (new Date()).toISOString()
        }
      });
    } else {
      throw new Meteor.Error('not-found',
        'Sorry, an invite with that ID could not be found.');
    }
  }
});
