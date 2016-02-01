Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Notifications.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let NotificationsSchema = new SimpleSchema({
  "userId": {
    type: String,
    label: "The ID of the receiver of this notifications."
  },
  "title": {
    type: String,
    label: "The Notification Title"
  },
  "content": {
    type: String,
    label: "The Notification Content"
  },
  "createAt": {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset();
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  "modifiedAt": {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  "creatorID": {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    }
  },
  "readAt": {
    type: Date,
    optional: true
  },
  "readStatus": {
    type: Boolean,
    defaultValue: false
  },
  "snacked": {
    type: Boolean,
    defaultValue: false
  },
  "snackedAt": {
    type: Date,
    optional: true
  }
});


Notifications.attachSchema(NotificationsSchema);
