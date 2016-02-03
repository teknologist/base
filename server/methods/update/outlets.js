Meteor.methods({
  updateOutlet(outlet) {
    check(outlet, Object);
    console.log(EJSON.stringify(outlet, {
      indent: true
    }));
    let existingOutlet = Outlets.findOne(outlet._id);
    if (existingOutlet) {
      let isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      let isOwner = (existingOutlet.ownerID === this.userId);
      if (isAdmin || isOwner) {
        Outlets.update({
          _id: outlet._id
        }, {
          $set: outlet
        });
        return Outlets.findOne(outlet._id);
      }

    } else {
      throw new Meteor.Error('unknownOutlet',
        'Sorry, you I cannot find that Outlet.'
      );
    }


  }
});
