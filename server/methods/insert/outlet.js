Meteor.methods({

  submitOutlet(outlet) {
      check(outlet, Object);
      outlet.ownerID = Meteor.userId();
      let isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      if (!isAdmin) {
        outlet.active = false;

      }
      console.log("Inserting Outlet: " + EJSON.stringify(outlet, {
        indent: true
      }));
      return Outlets.insert(outlet);



    },
    toggleOutlet(outletId) {
      check(outletId, String);
      let outlet = Outlets.findOne(outletId);
      if (outlet) {
        Outlets.update({
          _id: outletId
        }, {
          $set: {
            active: !outlet.active
          }
        });
        return Outlets.findOne(outletId);
      } else {
        throw new Meteor.Error('unknownOutlet',
          'Sorry, you I cannot find that Outlet.'
        );
      }


    }
});
