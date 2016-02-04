import React from 'react';
UsersList = React.createClass({
  mixins: [ TrackerReact ],
  getMeteorData() {
    let handle = Meteor.subscribe( 'users-infos' );

    return {
      currentUser: Meteor.user(),
      columns: [
        { width: '30%', label: 'Name', className: 'text-center' },
        { width: '30%', label: 'Email', className: 'text-center' },
        { width: '10%', label: 'Roles', className: 'text-center' },
        { width: '30%', label: 'Created At', className: 'text-center' }
      ],
      users: Meteor.users.find( { }, { sort: { createdAt: -1 } } ).fetch()

    };
  },
  render() {
    return <div className="users">
      <PageHeader label="Users" />
      { this.getMeteorData().users ?
        <Table context="users" columns={ this.getMeteorData().columns }>
          { this.getMeteorData().users.map( ( user ) => {
            return <UserRow key={ user._id } user={ user } />;
          })}
        </Table>
        : <Loading />}


    </div>

    ;
  }
});
