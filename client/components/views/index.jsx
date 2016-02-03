import React from 'react';
Index = React.createClass({
  mixins: [ TrackerReact ],
  getMeteorData() {
    Meteor.subscribe( 'index' );

    return {};
  },
  render() {
      return <div classNameName="index">
        <PageHeader label="Welcome to Project Asteroid." />

        <p>Project Asteroid is a super secret app that's launching soon! Type in your email below to get on the beta list.</p>

      </div>;
    }
});
