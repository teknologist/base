AppHeader = React.createClass({
  mixins: [ ReactMeteorData ],
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
