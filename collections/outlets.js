Outlets = new Meteor.Collection('outlets');

Outlets.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Outlets.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let AddressSchema = new SimpleSchema({
  placeName: {
    type: String
  },
  fullAddress: {
    type: String
  },
  lat: {
    type: Number,
    decimal: true
  },
  lng: {
    type: Number,
    decimal: true
  },
  geometry: {
    type: Object,
    blackbox: true
  },
  placeId: {
    type: String
  },
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  },
  country: {
    type: String
  }
});

let OutletsSchema = new SimpleSchema({

  name: {
    type: String,
    label: "The Outlet name"
  },
  description: {
    type: String,
    label: "The Outlet description"
  },

  createAt: {
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
  modifiedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  creatorID: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    },
    optional: true
  },
  OwnerID: {
    type: String,
    optional: true
  },
  tags: {
    type: [String],
    autoform: {
      type: "tags",
      afFieldInput: {
        trimValue: true

      }
    }
  },


  telephone: {
    type: String,
    label: "Telephone"
  },

  url: {
    type: String,
    optional: true,
    label: "website url",
    regEx: SimpleSchema.RegEx.Url
  },
  address: {
    type: AddressSchema,
    optional: true,
    label: '',
    autoform: {
      type: 'googleplace',
      //geopointName: "geocode" //optional, you can use a custom geopoint name
    }
  },
  serviceSchedule: {
    type: String,
    optional: true,
    label: "Opening hours"
  },
  opening_hours: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
      type: "hidden",
      label: false
    }
  },
  googlePlacesId: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    }
  },
  active: {
    type: Boolean,
    defaultValue: true
  }

});


Outlets.attachSchema(OutletsSchema);
//
//
// if (Meteor.isServer) {
//   Outlets.before.insert(function(userId, doc) {
//     doc.fullAddress = doc.addressStreetNumber + ' ' + doc.addressStreetName +
//       ', ' + doc.addressZipcode + ' ' + doc.addressCity + ', ' + doc.addressCountry;
//
//
//     //WORKAROUND for martin's bug with copy paste suggestions
//     if (doc.name.indexOf(doc.addressCountry) > -1) {
//       doc.name = doc.name.substring(0, doc.name.indexOf(','));
//     }
//
//     var geocode = utils.geocode(doc);
//     if (geocode !== undefined) {
//       doc.geocode = geocode;
//       if (geocode.length > 0 && geocode[0].latitude && geocode[0].longitude) {
//         console.log('Added new geocoding for Outlet: ' + doc.name +
//           ' -> (' + doc.geocode[0].latitude + ' , ' + doc.geocode[0].longitude +
//           ')');
//
//         doc.loc = [doc.geocode[0].longitude,
//           doc.geocode[0].latitude
//         ];
//       }
//     } else {
//       console.log('*** Geocode not found for outlet: ' + doc.name +
//         ' -> ' + doc.fullAddress);
//     }
//     var tagsIndex = '';
//     if (doc.tags) {
//       tagsIndex = doc.tags.join(' ');
//     }
//
//     var creatorName = '';
//     var creator = Meteor.users.findOne({
//       _id: doc.creatorID
//     });
//     if (creator && creator.username && creator.username.trim() !== '') {
//       creatorName = creator.username.trim();
//
//     }
//
//     doc.creatorName = creatorName;
//
//
//
//     //Opening hours
//
//     var url =
//       "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
//       doc.googlePlacesId +
//       "&key=AIzaSyAyrlcT7R-GaqwseJaSwTZCPVAcrNCuOac";
//
//     console.log("GooglePlaces Details API request:" + url);
//     //synchronous GET
//     var result = Meteor.http.get(url, {
//       timeout: 30000
//     });
//     if (result.statusCode == 200) {
//       var respJson = JSON.parse(result.content);
//
//       if (respJson.result) {
//         var firstResult = respJson.result;
//         //console.log('##### > ' + JSON.stringify(respJson));
//         if (firstResult && firstResult.opening_hours) {
//           // console.log("PlaceId response received for " +
//           //   outlet.name +
//           //     ": " + JSON.stringify(firstResult.opening_hours));
//           doc.opening_hours = firstResult.opening_hours;
//         }
//
//       } else {
//         console.log("### No results for " + doc.name);
//       }
//
//     } else {
//       console.log("Response issue: ", result.statusCode);
//       var errorJson = JSON.parse(result.content);
//       throw new Meteor.Error(result.statusCode, errorJson.error);
//     }
//
//
//
//     doc.searchIndex = doc.name + " " + doc.fullAddress.replace(",", " ") +
//       " " + tagsIndex + " " + creatorName + " " +
//       reviewers;
//
//
//   });
// }
