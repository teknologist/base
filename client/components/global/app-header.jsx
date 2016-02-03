import React from 'react';
AppHeader = React.createClass({
  mixins: [ TrackerReact ],
  getMeteorData() {
    return {
      brandLink: !!Meteor.user() ? '/dashboard' : '/'
    };
  },
  render() {
    return (
        <div>

          { this.props.hasUser ? <AuthenticatedNavigation /> : <PublicNavigation /> }
        </div>
    );
  }
});
