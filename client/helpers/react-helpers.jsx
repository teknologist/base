React.helpers = {
  humanDate( date ) {
    return moment( date ).format( 'MMMM Do, YYYY' );
  },
  isOwner( doc ) {
    let userID = Meteor.userId();
    let isAdmin = Roles.userIsInRole(userID, 'admin');
    let isOwner = (doc.ownerID === userID);
    return isOwner || isAdmin;

  },
  isAdmin() {
    return Roles.userIsInRole(Meteor.userId(), 'admin');
  },
  printTags( tags ) {
   return tags.map(function(tag) {
      return tag.name+' ';
    });
  },
  userFullnameFromID( userId ) {
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
        return getUser.profile.name.first + ' '+getUser.profile.name.last;

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
  }

};
