Meteor.methods({

  notificationsRead(notificationsIds) {
      check(notificationsIds, Array);
      this.unblock();
      console.log("Received Read for  " + notificationsIds.length +
        " notifications.");
      let notificationSnacked = Notifications.find({
        _id: {
          $in: notificationsIds
        }
      }).fetch();


      if (notificationSnacked && notificationSnacked.length > 0) {
        console.log("Read " + notificationSnacked.length +
          " notifications.");
        let result = Notifications.update({
          _id: {
            $in: notificationsIds
          }
        }, {
          $set: {
            readAt: new Date(),
            readStatus: true
          }
        }, {
          multi: true
        }, function(error, affectedDocs) {

          if (error) {
            console.log(error);
          } else {
            return "Update Successfull";
          }
        });

        return result;
      }
    },



    notificationsSnacked(notificationsIds) {
      check(notificationsIds, Array);
      this.unblock();
      console.log("Received Snack for  " + notificationsIds.length +
        " notifications.");
      let notificationSnacked = Notifications.find({
        _id: {
          $in: notificationsIds
        }
      }).fetch();


      if (notificationSnacked && notificationSnacked.length > 0) {
        console.log("Snacked " + notificationSnacked.length +
          " notifications.");
        let result = Notifications.update({
          _id: {
            $in: notificationsIds
          }
        }, {
          $set: {
            snackedAt: new Date(),
            snacked: true
          }
        }, {
          multi: true
        }, function(error, affectedDocs) {

          if (error) {
            console.log(error);
          } else {
            return "Update Successfull";
          }
        });

        return result;
      }
    }
});
