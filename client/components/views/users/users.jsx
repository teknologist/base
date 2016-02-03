import React from 'react';
UsersList = React.createClass({
  mixins: [ TrackerReact ],
  getMeteorData() {
    let handle = Meteor.subscribe( 'usersAdmin' );

    return {
      currentUser: Meteor.user(),
      columns: [

        { width: '30%', label: 'Email', className: 'text-center' },
        { width: '33%', label: 'Roles', className: 'text-center' },
        { width: '25%', label: 'Created At', className: 'text-center' }
      ],
      users: Meteor.users.find( { }, { sort: { name: 1 } } ).fetch()

    };
  },
  render() {
    return <div className="users">
      <PageHeader label="Users" />
      { this.data.users ?
        <Table context="users" columns={ this.data.columns }>
          { this.data.users.map( ( user ) => {
            return <UserRow key={ user._id } user={ user } />;
          })}
        </Table>
        : <Loading />}


    </div>

    ;
  }
});
