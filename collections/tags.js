Tags = new Mongo.Collection('tags');

Tags.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Tags.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

TagsSchema =  new SimpleSchema({

  "name": {
    type: String,
    label: "The Tag name"
  },
  "description": {
    type: String,
    label: "The Tag description",
    optional: true
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
    },
    optional: true
  },
  "synonyms": {
    type: [String],
    optional: true
  }

});


Tags.attachSchema(TagsSchema);
