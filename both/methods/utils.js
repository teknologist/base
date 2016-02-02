utils = {

  getUsername: function(userId) {
    var getService, getUser, services;
    getUser = Meteor.users.findOne({
      _id: userId
    });
    if (getUser) {
      //console.log('GET User: '+JSON.stringify(getUser));
      if (getUser.emails) {
        //console.log('GET Emails: '+getUser.emails[0].address);
        return getUser.emails[0].address;
      } else if (getUser.services) {
        services = getUser.services;
        getService = (function() {
          switch (false) {
            case !services.facebook:
              return services.facebook.email;
            case !services.google:
              return services.google.email;
            case !services.twitter:
              return services.twitter.screenName;
            default:
              return false;
          }
        })();
        return getService;
      } else {
        return getUser.profile.name;
      }
    }
    return 'Unknown';
  },
  getUserDisplayName: function(userId) {
    var getService, getUser, services;
    getUser = Meteor.users.findOne({
      _id: userId
    });
    if (getUser) {
      //console.log('GET User: '+JSON.stringify(getUser));
      var result = 'Unknown';
      if (getUser.emails) {
        //console.log('GET Emails: '+getUser.emails[0].address);
        result = getUser.emails[0].address;
      }

      if (getUser.username) {
        //console.log('GET Emails: '+getUser.emails[0].address);
        return getUser.username;
      } else if (getUser.profile && getUser.profile.name) {
        return getUser.profile.name;

      } else if (getUser.services) {
        services = getUser.services;
        getService = (function() {
          switch (false) {
            case !services.facebook:
              return services.facebook.first_name;
            case !services.google:
              return services.google.given_name;
            case !services.twitter:
              return services.twitter.screenName;
            default:
              return result;
          }
        })();
        return getService;
      }
    }
    return 'Unknown';
  },
  getPerson: function(userId) {
    var getUser = Meteor.users.findOne({
      _id: userId
    });
    return getUser;
  },

  getUserPictureUrl: function(userId) {
    if (Meteor.user()) {
      //return ProfilePictures.findOne({userID: Meteor.user()._id});
      if (userId) {

        var debug = false;

        var activeProfile = ProfilePictures.findOne({
          $and: [{
            userID: userId
          }, {
            active: true
          }]
        });
        if (activeProfile) {
          if (activeProfile.pictureURL && activeProfile.pictureURL.trim() !==
            '') {
            if (debug) console.log('activeProfile: Yes :' + activeProfile.pictureURL);
            var avatar = activeProfile.pictureURL;
            if (avatar) {
              if (debug) console.log('Found custom profile image');
              if (debug) console.log('userPhotoURL: ' + avatar);
              return avatar;
            }

          } else {
            if (activeProfile.picture) {
              var avatarLocal = Images.findOne(activeProfile.picture);
              if (avatarLocal) {
                if (debug) console.log('Found custom local profile image');
                if (avatarLocal.isImage()) {
                  if (debug) console.log('userPhotoURL: ' + avatarLocal.url());
                  return avatarLocal.url();
                }


              }
            }
          }
        }
        var userForPicture = Meteor.users.findOne(userId);
        if (userForPicture) {
          if (debug) console.log('Found User in DB');
          if (userForPicture.services) {
            if (debug) console.log('Found User Social Profile');
            if (userForPicture.services.google) {
              if (debug) console.log('Google :' + userForPicture.services
                .google
                .picture);
              return userForPicture.services.google.picture;
            }
            if (userForPicture.services.facebook) {
              if (debug) console.log('FB :' + userForPicture.services.facebook
                .id);
              return "https://graph.facebook.com/" + userForPicture.services
                .facebook.id + "/picture/?type=large";
            }


          }
        }



        var username = utils.getUsername(userId);

        if (username) {
          return Gravatar.imageUrl(utils.getUsername(userId), {
            size: 200,
            default: 'mm',
            secure: true
          });
        }
      } else {
        return Gravatar.imageUrl("unknown@unknown.com", {
          size: 200,
          default: 'mm',
          secure: true
        });
      }
    }

  },
  geocode: function(restaurant) {
    var geo = new GeoCoder({
      geocoderProvider: 'google'
    });

    try {
      var address = "";
      if (restaurant !== undefined) {
        if (restaurant.addressStreetNumber !== undefined) address +=
          restaurant.addressStreetNumber;
        if (restaurant.addressStreetName !== undefined) address +=
          ', ' +
          restaurant.addressStreetName;
        if (restaurant.addressCity !== undefined) address += ' ' +
          restaurant.addressCity;
        if (restaurant.addressCountry !== undefined) address += ' ' +
          restaurant.addressCountry;
        return geo.geocode(address);
      }
      return null;
    } catch (e) {
      console.log('Error in GeoCoding: ' + e);
    }
  }



};

//fs.createReadStream(path)


trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  console.log('Please fill in all required fields.');
  throwError('Please fill in all required fields.');
  return false;
};

isEmail = function(value) {
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  console.log('Please enter a valid email address.');
  throwError('Please enter a valid email address.');
  return false;
};

isValidPassword = function(password) {
  if (password.length < 6) {
    console.log('Your password should be 6 characters or longer.');
    throwError('Your password should be 6 characters or longer.');
    return false;
  }
  return true;
};

areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    console.log('Your two passwords are not equivalent.');
    throwError('Your two passwords are not equivalent.');
    return false;
  }
  return true;
};

throwError = function(message) {
  Errors.insert({
    message: message
  });
};

// check that the userId specified owns the documents
OwnsOutlet = function(userId, doc) {
  if (Meteor.isServer) return true;
  var user = Meteor.users.findOne({
    _id: userId
  });
  if (Roles.userIsInRole(user, ["admin"])) return true;

  if (doc && doc.creatorID) {
    return doc.creatorID === userId;
  } else if (doc) {
    return doc === userId;
  }

  return false;


};
