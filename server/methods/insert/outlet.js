Meteor.methods({

  submitOutlet(outlet) {
      check(outlet, Object);
      let isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      if (isAdmin) {
        console.log("Inserting Outlet: " + EJSON.stringify(outlet, {
          indent: true
        }));
        return Outlets.insert(outlet);


      } else {
        throw new Meteor.Error('unauthorized',
          'Sorry, you do not have the rights to create an Outlet.'
        );
      }

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
